<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed services
        $services = [
            ['title' => 'Web Development', 'description' => 'Create tailored websites to showcase your business online effectively. We build responsive, fast, and SEO-optimized websites.', 'icon' => '🌐', 'sort_order' => 1],
            ['title' => 'Digital Marketing', 'description' => 'Promote brands of all sizes with strategies that expand reach and visibility. From social media to PPC campaigns.', 'icon' => '📈', 'sort_order' => 2],
            ['title' => 'Graphic Design', 'description' => 'Enhance branding with visually appealing and professional graphic designs that capture your brand essence.', 'icon' => '🎨', 'sort_order' => 3],
            ['title' => 'Mobile App Development', 'description' => 'Build user-friendly apps that offer smooth navigation and enhance user experience on iOS and Android.', 'icon' => '📱', 'sort_order' => 4],
            ['title' => 'Full Stack Development', 'description' => 'Frontend and backend design, creating complete, functional web and mobile applications with modern technologies.', 'icon' => '💻', 'sort_order' => 5],
            ['title' => 'E-Commerce', 'description' => 'Develop digital stores and platforms to boost online business operations with secure payment integrations.', 'icon' => '🛒', 'sort_order' => 6],
            ['title' => 'SEO', 'description' => 'Improve site ranking, traffic, and sales through expert search engine optimization techniques.', 'icon' => '🔍', 'sort_order' => 7],
            ['title' => 'IoT', 'description' => 'Connect devices and digital services to deliver innovative web-based solutions for smart ecosystems.', 'icon' => '🔗', 'sort_order' => 8],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Seed settings
        $settings = [
            ['key' => 'site_name', 'value' => 'Ollow', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'Leading Software Company', 'group' => 'general'],
            ['key' => 'hero_title', 'value' => 'We are one of the leading software companies', 'group' => 'hero'],
            ['key' => 'hero_description', 'value' => 'Ollow is a leading software company specializing in Web & Mobile App Development and Digital Marketing.', 'group' => 'hero'],
            ['key' => 'email', 'value' => 'info@ollow.com', 'group' => 'contact'],
            ['key' => 'phone', 'value' => '+1 234 567 890', 'group' => 'contact'],
            ['key' => 'address', 'value' => 'Your Business Location', 'group' => 'contact'],
            ['key' => 'facebook', 'value' => 'https://facebook.com', 'group' => 'social'],
            ['key' => 'instagram', 'value' => 'https://instagram.com', 'group' => 'social'],
            ['key' => 'linkedin', 'value' => 'https://linkedin.com', 'group' => 'social'],
            ['key' => 'whatsapp', 'value' => '+1234567890', 'group' => 'social'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
