<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        if ($request->has('group')) {
            $settings = Setting::getGroup($request->group);
        } else {
            $settings = Setting::all()->pluck('value', 'key');
        }
        return response()->json($settings);
    }
}
