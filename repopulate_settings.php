<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Setting;

$defaults = [
    'site_name' => 'Owllow',
    'facebook' => 'https://facebook.com/ollow',
    'instagram' => 'https://instagram.com/ollow',
    'linkedin' => 'https://linkedin.com/company/ollow',
    'whatsapp' => '+919876543210',
    'email' => 'contact@ollow.com',
    'phone' => '+919876543210',
    'address' => 'Chennai, Tamil Nadu',
];

foreach ($defaults as $key => $value) {
    Setting::set($key, $value);
}

echo "Settings repopulated successfully.\n";
print_r(Setting::all()->pluck('value', 'key')->toArray());
