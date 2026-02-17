<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::query()->ordered();
        
        if ($request->boolean('featured')) {
            $query->featured();
        }
        
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        
        $projects = $query->get();
        return response()->json($projects);
    }

    public function show($id): JsonResponse
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }
}
