<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;

    public $table = 'transaction_detail';

    protected $fillable = [
        'transaction_id',
        'transaction_category_id',
        'name',
        'value_idr'
    ];
    
    public $timestamps = false;

    function header() {
        return $this->belongsTo(TransactionHeader::class, 'transaction_id', 'id');
    }
}
