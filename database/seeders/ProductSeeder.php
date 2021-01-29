<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Product::factory(10)->create()->each(function ($product) {
            $product->images()->saveMany(ProductImage::factory(rand(1, 5))->make());
        });
    }
}
