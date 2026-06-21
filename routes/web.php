<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UrlController;

Route::get('/', function () {
    return view('welcome');
});

Route::post("/short-url", [\App\Http\Controllers\UrlController::class, "createShortUrl"])
    ->name('url.short');

Route::get("/{code}", [UrlController::class, "redirectToOriginalUrl"])
    ->name('url.redirect');

Route::get("starts/{code}", [UrlController::class, "stats"])
    ->name('url.stats');