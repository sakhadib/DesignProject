<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\ProblemController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\Admin_controller;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ContestController;
use App\Http\Controllers\ContestGetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderBoardController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RatingCalculationController;
use App\Http\Controllers\UserPageController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    // Route::post('signup', [AuthController::class, 'signup']);

});

Route::group([

    'prefix' => 'auth'

], function ($router) {

    Route::post('signup', [AuthController::class, 'signup']);

});

//! Need Authentication for these routes
Route::group([

    'middleware' => 'api',
    'prefix' => 'blog'

], function ($router) {

    // Blogs
    Route::post('create', [BlogController::class, 'createBlog']);
    Route::post('delete', [BlogController::class, 'deleteBlog']);
    Route::post('edit', [BlogController::class, 'editBlog']);

    // Comments
    Route::post('comment', [CommentController::class, 'createComment']);
    Route::post('comment/edit', [CommentController::class, 'editComment']);
    Route::post('comment/delete', [CommentController::class, 'deleteComment']);

    // Votes
    Route::post('vote', [VoteController::class, 'createVote']);
    Route::post('vote/delete', [VoteController::class, 'deleteVote']);
    
});


//TODO : No need of authentication for these routes
Route::group([

    'prefix' => 'blog'

], function ($router) {
     // Get blogs
     Route::get('all', [BlogController::class, 'allBlogs']);
     Route::get('/single/{id}', [BlogController::class, 'singleBlog']);

     Route::get('votes/{blog_id}', [VoteController::class, 'getBlogVotes']);

});


//! Need Authentication for these routes
Route::group([

    'middleware' => 'api',
    'prefix' => 'problem'

], function ($router) {

    Route::post('create', [ProblemController::class, 'createProblem']);
    Route::post('edit', [ProblemController::class, 'editProblem']);

    Route::post('submit', [SubmissionController::class, 'submit']);

    Route::get('my/unsolved', [ProblemController::class, 'myUnsolvedProblems']);
    
});




//TODO : No need of authentication for these routes
Route::group([
    'prefix' => 'problem'

], function ($router) {

    Route::get('single/{id}', [ProblemController::class, 'viewSingleProblem']);
    Route::get('all', [ProblemController::class, 'viewAllProblems']);
    Route::get('approved', [ProblemController::class, 'viewApprovedProblems']);
    Route::get('pending', [ProblemController::class, 'viewPendingProblems']);
    
});



//! Need Authentication for these routes
Route::group([

    'middleware' => 'api',
    'prefix' => 'admin'

], function ($router) {

    Route::get('status', [Admin_controller::class, 'isThisUserAdmin']);

    Route::post('make', [Admin_controller::class, 'makeAdmin']);
    Route::post('remove', [Admin_controller::class, 'removeAdmin']);

    Route::post('problem/approve', [Admin_controller::class, 'approveProblem']);
    Route::post('problem/incontest', [Admin_controller::class, 'makeProblemStateToinContest']);
    Route::post('problem/outcontest', [Admin_controller::class, 'approveProblem']);
    Route::post('problem/unpublish', [Admin_controller::class, 'unpublishProblem']);
    Route::post('problem/remove', [Admin_controller::class, 'removeProblem']);

    Route::get('problem/single/{problem_id}', [Admin_controller::class, 'getSingleProblem']);
    Route::post('problem/edit', [Admin_controller::class, 'editProblem']);

    Route::get('contest/single/{contest_id}', [Admin_controller::class, 'getSingleContest']);

    Route::get('contest/problem/{contest_id}', [Admin_controller::class, 'getContestProblems']);

    Route::get('user/all', [Admin_controller::class, 'getUserList']);
    Route::get('user/single/{id}', [Admin_controller::class, 'getUser']);

    Route::post('contest/problem/add', [ContestController::class, 'addProblem']);
    Route::post('contest/problem/remove', [ContestController::class, 'removeProblem']);


    //! Calculate Rating
    Route::post('rating/calculate', [RatingCalculationController::class, 'calculate']);
});






//! Need Authentication for these routes
Route::group([

    'middleware' => 'api',
    'prefix' => 'notice'

], function ($router) {
    
    Route::post('create', [NoticeController::class, 'createNotice']);
    Route::post('delete', [NoticeController::class, 'deleteNotice']);
    Route::post('edit', [NoticeController::class, 'updateNotice']);
    
});



//TODO : No need of authentication for these routes
Route::group([

    'prefix' => 'notice'

], function ($router) {
    
    Route::get('all', [NoticeController::class, 'allNotices']);
    Route::get('top', [NoticeController::class, 'topNotices']);
    Route::get('single/{id}', [NoticeController::class, 'singleNotice']);

    Route::get('admin/{id}', [NoticeController::class, 'userNotices']);
    
});



//! Need Authentication for these routes
Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'contest'
    ], routes: function ($router) {

    Route::post('create', [ContestController::class, 'create']);
    Route::post('edit', [ContestController::class, 'update']);
    Route::post('delete', [ContestController::class, 'delete']);

    Route::post('problem/add', [ContestController::class, 'AddProblemForUserCreatedContest']);
    Route::post('problem/remove', [ContestController::class, 'removeProblemForUserCreatedContest']);


    Route::post('join', [ContestController::class, 'register']);
    Route::post('leave', [ContestController::class, 'unregister']);

});



//TODO : No need of authentication for these routes
Route::group(
    [
        'prefix' => 'contest'
    ], routes: function ($router) {

    Route::get('all', [ContestGetController::class, 'getAllContests']);
    Route::get('all/upcoming', [ContestGetController::class, 'getUpcomingContests']);
    Route::get('all/active', [ContestGetController::class, 'getRunningContests']);
    Route::get('all/ended', [ContestGetController::class, 'allEndedContests']);

    Route::post('all/my', [ContestGetController::class, 'myCreatedContests']);
    Route::get('all/user/{id}', [ContestGetController::class, 'userCreatedContests']);

    Route::get('single/{id}', [ContestGetController::class, 'getSingleContest']);

    Route::get('{id}/participants', [ContestGetController::class, 'getParticipantList']);

    Route::post('history', [ContestGetController::class, 'myParticipatedContests']);
    Route::get('history/user/{id}', [ContestGetController::class, 'userParticipatedContests']);

    Route::post('future/my', [ContestGetController::class, 'myFutureContests']);

    Route::post('isparticipant', [ContestGetController::class, 'amIregistered']);

    Route::get('problems/{contest_id}', [ContestGetController::class, 'getProblems']);

    Route::get('my/problems/{contest_id}', [ContestGetController::class, 'getContestProblemsOfMyContest']);


    // New
    Route::get('upcoming/private/my', [ContestGetController::class, 'userUpcomingRegisteredPrivateContest']);
    Route::get('past/private/my', [ContestGetController::class, 'userPastRegisteredPrivateContest']);

});


//TODO : No need of authentication for these routes
Route::group(
    [
        'prefix' => 'submission'
    ], routes: function ($router) {

    Route::get('problem/{problem_id}', [SubmissionController::class, 'getSubmissionsForProblem']);
    Route::get('user/{user_id}', [SubmissionController::class, 'getSubmissionsForUser']);
    Route::get('contest/{contest_id}', [SubmissionController::class, 'getSubmissionsForContest']);
    Route::get('contest/{contest_id}/user/{user_id}', [SubmissionController::class, 'getSubmissionsForUserInContest']);    
    Route::get('contest/{contest_id}/problem/{problem_id}/user/{user_id}', [SubmissionController::class, 'getSubmissionsForUserInContestForProblem']);
    Route::get('problem/{problem_id}/user/{user_id}', [SubmissionController::class, 'getSubmissionsForUserForProblem']);
    Route::get('contest/{contest_id}/problem/{problem_id}', [SubmissionController::class, 'getSubmissionsForProblemForContest']);
    

});




//TODO : No need of authentication for these routes
Route::group(
    [
        'prefix' => 'user'
    ], routes: function ($router) {

        Route::get('all', [UserController::class, 'allUsers']);
        Route::get('single/{id}', [UserController::class, 'userDetails']);
        Route::get('username/{username}', [UserController::class, 'getUserDetailsByUsername']);
    }
);



Route::group(
    [
        'prefix' => 'common'
    ], routes: function ($router) {

        Route::get('count', [DashboardController::class, 'commonCountValues']);
        Route::get('submission/contest/in', [DashboardController::class, 'getInContestSubmissionCount']);
        Route::get('submission/contest/out', [DashboardController::class, 'getOutContestSubmissionCount']);
        Route::get('submission/tags', [DashboardController::class, 'getStatByProblemTag']);
    }
);



Route::group(
    [
        'prefix' => 'rating',
        'middleware' => 'api'
    ], routes: function ($router) {
        Route::post('my', [RatingController::class, 'getMyRating']);
        Route::post('my/history', [RatingController::class, 'getMyRatingHistory']);
    }
);

Route::group(
    [
        'prefix' => 'rating'
    ], routes: function ($router) {
        Route::get('contest/leaderboard/{contest_id}', [LeaderBoardController::class, 'getContestLeaderboard']);
        Route::get('contest/{contest_id}/user/{user_id}', [LeaderBoardController::class, 'totalPenaltyOfAnUser']);
        
        Route::get('user/{user_id}', [RatingController::class, 'getRating']);
        Route::get('history/user/{user_id}', [RatingController::class, 'getRatingHistory']);
        Route::get('contest/{contest_id}', [RatingController::class, 'ratingsForContest']);

        Route::get('total', [LeaderBoardController::class, 'getTotalLeaderBoard']);
    }
);


Route::group(
    [
        'prefix' => 'user'
    ], routes: function ($router) {
        Route::get('details/{user_id}', [UserPageController::class, 'getUserDetails']);

        Route::get('rating/{user_id}', [UserPageController::class, 'getUserRating']);
        Route::get('rating/history/{user_id}', [UserPageController::class, 'getUserRatingHistory']);

        Route::get('submission/heatmap/{user_id}', [UserPageController::class, 'dateWiseSubmissionCount']);
        Route::get('submission/mini/{user_id}', [UserPageController::class, 'lastFiveSubmittedProblems']);
        Route::get('submission/all/{user_id}', [UserPageController::class, 'allSolvedProblems']);

        Route::get('blog/mini/{user_id}', [UserPageController::class, 'lastFiveBlogsByUser']);
        Route::get('blog/all/{user_id}', [UserPageController::class, 'allBlogsByUser']);

        Route::get('problem/all/{user_id}', [UserPageController::class, 'userSubmittedProblems']);
        Route::get('problem/mini/{user_id}', [UserPageController::class, 'lastFiveProblemsByUser']);

        Route::get('contest/mini/{user_id}', [UserPageController::class, 'lastFiveContestByUser']);
        Route::get('contest/all/{user_id}', [UserPageController::class, 'allContestByUser']);
    }
);

Route::group(
    [
        'prefix' => 'home'
    ], routes: function ($router) {
        Route::get('counts', [HomePageController::class, 'generalCounts']);
        Route::get('notices', [HomePageController::class, 'LatestThreeNotices']);
        Route::get('top/blogs', [HomePageController::class, 'TopThreeBlogByUpvotes']);
        Route::get('top/problems', [HomePageController::class, 'TopThreeProblemBySubmissions']);
        Route::get('top/users', [HomePageController::class, 'TopThreeUserByRating']);
    }
);


Route::group(
    [
        'prefix' => 'chat',
        'middleware' => 'api'
    ], routes: function ($router) {
        Route::post('send', [ChatController::class, 'send']);
        Route::get('history/{problem_id}', [ChatController::class, 'getHistory']);
    }
);




