<?php

namespace Database\Seeders;

use App\Models\TransactionCategory;
use App\Models\TransactionDetail;
use App\Models\TransactionHeader;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TransactionCategory::insert([
            ['name' => 'income'],
            ['name' => 'expense']
        ]);

        for ($i=0; $i < 10; $i++) { 
            $transaction = TransactionHeader::create([
                'description' => fake()->sentence(),
                'code' => fake()->numerify("20230909######"),
                'rate_euro' => (double)fake()->numerify("1#000"),
                'date_paid' => now()
            ]);
            for ($j=0; $j < 4; $j++) { 
                TransactionDetail::insert([
                    'transaction_id' => $transaction->id,
                    'transaction_category_id' => fake()->numberBetween(1, 2),
                    'name' => fake()->sentence(),
                    'value_idr' => (double)fake()->numerify("###00")
                ]);
            }
        }
                
    }
}
