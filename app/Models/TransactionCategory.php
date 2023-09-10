<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    use HasFactory;

    public $table = 'ms_category';

    protected $fillable = [
        'name'
    ];

    public $timestamps = false;
}
