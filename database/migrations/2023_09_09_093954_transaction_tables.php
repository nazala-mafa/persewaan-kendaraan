<?php

use App\Models\TransactionCategory;
use App\Models\TransactionHeader;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_header', function(Blueprint $table) {
            $table->id();
            $table->string('description');
            // $table->enum('code', []);
            $table->string('code')->unique();
            $table->double('rate_euro');
            $table->dateTime('date_paid');
        });

        Schema::create('ms_category', function(Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('transaction_detail', function(Blueprint $table) {
            $table->id();
            $table->foreignIdFor(TransactionHeader::class, 'transaction_id')->index()->references('id')->on('transaction_header')->cascadeOnDelete()->restrictOnUpdate();
            $table->foreignIdFor(TransactionCategory::class, 'transaction_category_id')->index()->references('id')->on('ms_category')->cascadeOnDelete()->restrictOnUpdate();
            $table->string('name');
            $table->double('value_idr');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_detail');
        Schema::dropIfExists('ms_category');
        Schema::dropIfExists('transaction_header');
    }
};
