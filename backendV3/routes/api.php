<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;

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
    Route::post('create', [BlogController::class, 'createBlog']);
    Route::post('delete', [BlogController::class, 'deleteBlog']);
    Route::post('comment', [CommentController::class, 'createComment']);
    Route::post('comment/edit', [CommentController::class, 'editComment']);
    Route::post('comment/delete', [CommentController::class, 'deleteComment']);
});
