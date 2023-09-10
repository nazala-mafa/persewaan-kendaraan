<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NumbersController extends Controller
{
    private function fibbonacci($n)
    {
        if ($n <= 0) {
            return 0;
        } elseif ($n == 1) {
            return 1;
        } else {
            return $this->fibbonacci($n - 1) + $this->fibbonacci($n - 2);
        }
    }

    function fibonacciProduct($n1, $n2)
    {
        return response()->json([
            'result' => $this->fibbonacci($n1) + $this->fibbonacci($n2)
        ]);
    }

    function index()
    {
        return inertia('Fibonacci/Index');
    }
}