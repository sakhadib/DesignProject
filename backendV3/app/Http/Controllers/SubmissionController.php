<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log; // Added for logging

use App\Models\Submission;
use App\Models\User;
use App\Models\Contest;
use App\Models\ContestProblem;

use App\Models\Problem;

class SubmissionController extends Controller
{
    /**
     * Submit a solution to a problem for evaluation
     * 
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function submit(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'problem_id' => 'required|exists:problems,id',
            'answer' => 'required|string',
        ]);

        // Fetch the problem details
        $problem = Problem::find($request->problem_id);

        if(!$problem) {
            return response()->json([
                'error' => 'Problem not found',
            ], 404);
        }

        if($request->has('contest_id') && $request->contest_id)
        {
            $Contest_problem = ContestProblem::where('contest_id', $request->contest_id)
            ->where('problem_id', $request->problem_id)
            ->first();

            if(!$Contest_problem) {
                return response()->json([
                    'error' => 'Problem not found in contest',
                ], 404);
            }
        }

        // Extract problem details
        $problem_statement = $problem->description;
        $actual_answer = $problem->answer;
        $detailed_answer = $problem->note;
        $total_points = $problem->xp;

        // User's provided answer
        $user_provided_answer = $request->answer;

        // Gemini AI API Key
        $geminiAIKey = env('GEMINI_API_KEY');

        // Prepare the refined prompt using Heredoc syntax for better readability
        $prompt = <<<EOD
Problem Statement:
$problem_statement

Correct Answer:
$actual_answer

Reason Behind Correct Answer:
$detailed_answer

User's Answer:
$user_provided_answer

Instructions:
1. **Evaluation Criteria:**
   - **Accuracy:** Compare the user's answer directly with the correct answer.
   - **Detail & Relevance:** Award partial points if the answer demonstrates understanding and includes relevant details, even if not entirely correct.
   - **Specificity:** Solutions should be specific. Abstract ideas or generic approaches should not receive points.
   
2. **Scoring Guidelines:**
   - Assign a score between 0 and $total_points.
   - A fully correct and specific answer receives the full $total_points.
   - Partially correct answers with relevant details receive proportional points it does not have to be in 10s. You can grade odd numbers relative to correctness.
   - Incorrect or overly abstract answers receive 0 points.

3. **Response Format:**
   - **ONLY** return a single numerical score.
   - Do not include any additional text, explanations, or formatting.

Please evaluate the user's answer based on the above criteria and provide the score as a single number.
EOD;

        try {
            // Make the request to Gemini AI
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$geminiAIKey", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            // Check if the response is successful
            if ($response->successful()) {
                $data = $response->json();

                // Debugging: Log the AI response for future reference
                Log::info('AI Response:', $data);

                // Extract the score text from the response
                // Corrected the path to access 'candidates' instead of 'contents'
                $scoreText = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

                // Use regular expression to extract the first numerical value from the score text
                if (preg_match('/\d+(\.\d+)?/', $scoreText, $matches)) {
                    $score = (float) $matches[0];

                    // Ensure the score does not exceed total_points and is not negative
                    $score = max(0, min($score, $total_points));

                    $submission = new Submission();
                    $submission->problem_id = $request->problem_id;
                    $submission->user_id = auth()->user()->id;
                    $submission->answer = $user_provided_answer;
                    $submission->xp = $score;

                    if($request->contest_id) {
                        $contest_id = $request->contest_id;
                        $problem_id = $request->problem_id;

                        if($this->inContest($contest_id, $problem_id)) {
                            $penalty = now()->diffInMinutes(Contest::find($contest_id)->start_time);
                            $submission->penalty = $penalty;
                            $submission->contest_id = $contest_id;
                        } 
                    }

                    $submission->save();

                    return response()->json([
                        'message' => 'Submission Accepted',
                        'xp_recieved' => $score,
                    ]);
                } else {
                    // Log the invalid AI response for debugging
                    Log::error('Invalid AI Score Response', [
                        'problem_id' => $request->problem_id,
                        'user_provided_answer' => $user_provided_answer,
                        'ai_response_text' => $scoreText,
                        'full_response' => $data,
                    ]);

                    return response()->json([
                        'error' => 'Invalid response from AI',
                        'details' => $data,
                    ], 500);
                }
            } else {
                // Log the failed AI request for debugging
                Log::error('Failed AI Evaluation Request', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return response()->json([
                    'error' => 'Failed to evaluate answer',
                    'details' => $response->body(),
                ], $response->status());
            }
        } catch (\Exception $e) {
            // Log any unexpected exceptions
            Log::error('Exception during AI Evaluation', [
                'message' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'An unexpected error occurred while evaluating the answer.',
            ], 500);
        }
    }



    /**
     * Summary of inContest
     * @param int $contest_id
     * @param int $problem_id
     * @return bool
     */
    private function inContest($contest_id, $problem_id)
    {
        $contest = Contest::find($contest_id);
        $now = now();
        $contest_start = $contest->start_time;
        $contest_end = $contest->end_time;

        if ($now->isBefore($contest_start) || $now->isAfter($contest_end)) {
            return false;
        }

        $problem = ContestProblem::where('contest_id', $contest_id)
            ->where('problem_id', $problem_id)
            ->first();

        return $problem !== null;
    }




    //-----------------------------------------Get Request-----------------------------------------//

    /**
     * Get all submissions for a specific problem
     * 
     * @param int $problem_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSubmissionsForProblem($problem_id)
    {
        $submissions = Submission::where('problem_id', $problem_id)
                                 ->with('user:id,username')
                                 ->get(['id', 'user_id', 'xp', 'contest_id', 'created_at']);

        if($submissions->isEmpty()) {
            return response()->json([
                'messege' => 'No submissions found for this problem',
            ], 404);
        }

        
        return response()->json([
            'messege' => 'Submissions found',
            'submissions' => $submissions,
        ]);
    }
}
