<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller {
    /**
     * Entry point for React App
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index() {
        return view('app');
    }
}
