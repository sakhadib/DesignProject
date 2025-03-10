<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Models\ContestParticipant;
use App\Models\Submission;
use App\Models\Rating;
use App\Models\User;

class RatingCalculationController extends Controller
{
    /**
     * Calculate and update ratings for a contest.
     *
     * This method performs the following steps:
     * 1. Validates the request to ensure 'contest_id' is provided and exists.
     * 2. Checks if the authenticated user is an admin.
     * 3. Checks if ratings have already been calculated for the contest.
     * 4. Fetches all participants for the contest.
     * 5. Preloads submissions for all participants and calculates total XP and penalty for each user.
     * 6. Sorts users by total XP (descending) and total penalty (ascending).
     * 7. Fetches current ratings for all users.
     * 8. Calculates rating changes using the Elo rating system.
     * 9. Saves the rating changes to the database.
     *
     * @param \Illuminate\Http\Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the result of the rating calculation.
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'contest_id' => 'required|exists:contests,id',
        ]);

        $my_id = auth()->user()->id;
        $me_admin = Admin::where('user_id', $my_id)->first();
        if (!$me_admin) {
            return response()->json(['message' => 'You are not authorized to calculate ratings.'], 403);
        }

        $is_rating_calculated = Rating::where('contest_id', $request->contest_id)->exists();
        if ($is_rating_calculated) {
            return response()->json(['message' => 'Ratings already calculated for this contest.'], 400);
        }

        $contestId = $request->contest_id;

        // Fetch all participants for the contest
        $participants = ContestParticipant::where('contest_id', $contestId)
            ->with('user')
            ->get();

        if ($participants->isEmpty()) {
            return response()->json(['message' => 'No participants found for this contest.'], 400);
        }

        $users = $participants->pluck('user');

        // Preload submissions for all participants in the contest
        $submissions = Submission::where('contest_id', $contestId)
            ->whereIn('user_id', $users->pluck('id'))
            ->get()
            ->groupBy(['user_id', 'problem_id']); // Group by user and problem

        $userData = [];

        foreach ($users as $user) {
            $userSubmissions = $submissions->get($user->id, collect());
            $totalXp = 0;
            $totalPenalty = 0;

            foreach ($userSubmissions as $problemSubmissions) {
                // Get best submission for the problem (max XP, min penalty)
                $best = $problemSubmissions->sortByDesc('xp')->sortBy('penalty')->first();
                $totalXp += $best->xp ?? 0;
                $totalPenalty += $best->penalty ?? 0;
            }

            $userData[] = [
                'user' => $user,
                'total_xp' => $totalXp,
                'total_penalty' => $totalPenalty,
            ];
        }

        // Sort users by XP (descending) and Penalty (ascending)
        usort($userData, function ($a, $b) {
            if ($a['total_xp'] !== $b['total_xp']) {
                return $b['total_xp'] - $a['total_xp'];
            }
            return $a['total_penalty'] - $b['total_penalty'];
        });

        $N = count($userData);
        if ($N < 2) {
            return response()->json(['message' => 'At least two participants required to calculate ratings.'], 400);
        }

        // Fetch current ratings for all users
        $currentRatings = [];
        foreach ($userData as $data) {
            $user = $data['user'];
            $initial = Rating::where('user_id', $user->id)
                ->whereNull('contest_id')
                ->value('rating_change') ?? 1500;

            $previousDeltas = Rating::where('user_id', $user->id)
                ->whereNotNull('contest_id')
                ->sum('rating_change');

            $currentRating = $initial + $previousDeltas;
            $currentRatings[$user->id] = $currentRating;
        }

        $K = 32;
        $ratingChanges = [];

        foreach ($userData as $i => $dataA) {
            $userA = $dataA['user'];
            $ra = $currentRatings[$userA->id];
            $expected = 0;

            // Calculate expected score
            foreach ($userData as $dataB) {
                if ($dataA['user']->id === $dataB['user']->id) continue;

                $rb = $currentRatings[$dataB['user']->id];
                $expected += 1 / (1 + pow(10, ($rb - $ra) / 400));
            }

            // Calculate actual score
            $actual = 0;
            foreach ($userData as $dataB) {
                if ($dataA['user']->id === $dataB['user']->id) continue;

                if ($dataA['total_xp'] > $dataB['total_xp']) {
                    $actual += 1;
                } elseif ($dataA['total_xp'] == $dataB['total_xp']) {
                    if ($dataA['total_penalty'] < $dataB['total_penalty']) {
                        $actual += 1;
                    } elseif ($dataA['total_penalty'] == $dataB['total_penalty']) {
                        $actual += 0.5;
                    }
                }
            }

            // Compute rating change
            $delta = ($K / ($N - 1)) * ($actual - $expected);
            $ratingChanges[$userA->id] = $delta;
        }

        // Save rating changes to the database
        foreach ($ratingChanges as $userId => $change) {
            Rating::create([
                'user_id' => $userId,
                'contest_id' => $contestId,
                'rating_change' => $change,
            ]);
        }

        return response()->json(['message' => 'Ratings updated successfully.']);
    }
}