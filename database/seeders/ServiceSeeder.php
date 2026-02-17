<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Create tailored websites to showcase your business online effectively. We build responsive, fast, and SEO-optimized websites.',
                'icon' => 'globe',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Digital Marketing',
                'description' => 'Promote brands of all sizes with strategies that expand reach and visibility. From social media to PPC campaigns.',
                'icon' => 'trending-up',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Graphic Design',
                'description' => 'Enhance branding with visually appealing and professional graphic designs that capture your brand essence.',
                'icon' => 'palette',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Build user-friendly apps that offer smooth navigation and enhance user experience on iOS and Android.',
                'icon' => 'smartphone',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Full Stack Development',
                'description' => 'Frontend and backend design, creating complete, functional web and mobile applications with modern technologies.',
                'icon' => 'code',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'E-Commerce',
                'description' => 'Develop digital stores and platforms to boost online business operations with secure payment integrations.',
                'icon' => 'shopping-cart',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'SEO',
                'description' => 'Improve site ranking, traffic, and sales through expert search engine optimization techniques.',
                'icon' => 'search',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'IoT',
                'description' => 'Connect devices and digital services to deliver innovative web-based solutions for smart ecosystems.',
                'icon' => 'cpu',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['title' => $service['title']], $service);
        }
    }
}
