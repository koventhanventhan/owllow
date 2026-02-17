<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$settings = \App\Models\Setting::all()->pluck('value', 'key')->toArray();
file_put_contents('settings_dump.json', json_encode($settings, JSON_PRETTY_PRINT));
print_r($settings);
