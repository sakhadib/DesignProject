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


Route::group([

    'middleware' => 'api',
    'prefix' => 'blog'

], function ($router) {

    // Blogs
    Route::post('create', [BlogController::class, 'createBlog']);
    Route::post('delete', [BlogController::class, 'deleteBlog']);
    Route::post('edit', [BlogController::class, 'editBlog']);

    // Get blogs
    Route::get('all', [BlogController::class, 'allBlogs']);
    Route::get('/single/{id}', [BlogController::class, 'singleBlog']);

    // Comments
    Route::post('comment', [CommentController::class, 'createComment']);
    Route::post('comment/edit', [CommentController::class, 'editComment']);
    Route::post('comment/delete', [CommentController::class, 'deleteComment']);

    // Votes
    Route::post('vote', [VoteController::class, 'createVote']);
    Route::post('vote/delete', [VoteController::class, 'deleteVote']);
    Route::get('votes/{blog_id}', [VoteController::class, 'getBlogVotes']);
    
});



Route::group([

    'middleware' => 'api',
    'prefix' => 'problem'

], function ($router) {

    Route::post('create', [ProblemController::class, 'createProblem']);
    Route::post('edit', [ProblemController::class, 'editProblem']);

    Route::get('single/{id}', [ProblemController::class, 'viewSingleProblem']);
    Route::get('all', [ProblemController::class, 'viewAllProblems']);

    Route::post('submit', [SubmissionController::class, 'submit']);
    
});



Route::group([

    'middleware' => 'api',
    'prefix' => 'admin'

], function ($router) {

    Route::get('status', [Admin_controller::class, 'isThisUserAdmin']);
    Route::post('make', [Admin_controller::class, 'makeAdmin']);
});

