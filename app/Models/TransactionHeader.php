<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHeader extends Model
{
    use HasFactory;

    public $table = 'transaction_header';

    protected $fillable = [
        'description',
        'code',
        'rate_euro',
        'date_paid'
    ];
    
    public $timestamps = false;

    function details() {
        return $this->hasMany(TransactionDetail::class, 'transaction_id', 'id');
    }
}
