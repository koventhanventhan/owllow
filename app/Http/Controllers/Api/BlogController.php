<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function index(): JsonResponse
    {
        $blogs = Blog::published()
            ->orderBy('published_at', 'desc')
            ->get();
        return response()->json($blogs);
    }

    public function show($slug): JsonResponse
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        return response()->json($blog);
    }
}
