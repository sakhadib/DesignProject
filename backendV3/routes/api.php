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
    
});




//TODO : No need of authentication for these routes
Route::group([
    'prefix' => 'problem'

], function ($router) {

    Route::get('single/{id}', [ProblemController::class, 'viewSingleProblem']);
    Route::get('all', [ProblemController::class, 'viewAllProblems']);
    
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
    Route::post('problem/unpublish', [Admin_controller::class, 'unpublishProblem']);
    Route::post('problem/remove', [Admin_controller::class, 'removeProblem']);
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

    Route::post('create', [ContestController::class, 'createContest']);
    Route::post('edit', [ContestController::class, 'editContest']);
    Route::post('delete', [ContestController::class, 'deleteContest']);

    Route::post('problem/add', [ContestController::class, 'addProblem']);
    Route::post('problem/remove', [ContestController::class, 'removeProblem']);

    Route::post('join', [ContestController::class, 'joinContest']);
    Route::post('leave', [ContestController::class, 'leaveContest']);

});



//TODO : No need of authentication for these routes
Route::group(
    [
        'prefix' => 'contest'
    ], routes: function ($router) {

    Route::get('all/upcoming', [ContestController::class, 'allUpcomingContests']);
    Route::get('all/active', [ContestController::class, 'allActiveContests']);
    Route::get('all/ended', [ContestController::class, 'allEndedContests']);
    Route::get('all/my', [ContestController::class, 'myCreatedContests']);
    Route::get('all/user/{id}', [ContestController::class, 'userCreatedContests']);

    Route::get('single/{id}', [ContestController::class, 'getSingleContest']);

    Route::get('{id}/participants', [ContestController::class, 'contestParticipants']);

    Route::get('history', [ContestController::class, 'myParticipatedContests']);
    Route::get('history/user/{id}', [ContestController::class, 'userParticipatedContests']);


});




