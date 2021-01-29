<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class ProductController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        // Get all products from DB with Images pivot table
        $products = Product::with('images')->get();

        // Print all data in JSON
        return response()->json($products, Response::HTTP_OK);
    }
}
