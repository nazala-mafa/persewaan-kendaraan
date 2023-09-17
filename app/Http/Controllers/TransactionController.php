<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionStoreRequest;
use App\Http\Requests\TransactionUpdateRequest;
use App\Models\TransactionCategory;
use App\Models\TransactionDetail;
use App\Models\TransactionHeader;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    function datatable(TransactionService $transactionService)
    {
        return response()->json($transactionService->datatable());
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = TransactionCategory::all();
        return inertia('Transaction/Index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = TransactionCategory::all();
        return inertia('Transaction/Create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionStoreRequest $request)
    {
        \DB::beginTransaction();
        try {
            $transactionHeader = TransactionHeader::create([
                'description' => $request->description,
                'code' => $request->code,
                'rate_euro' => $request->rate_euro,
                'date_paid' => \Carbon\Carbon::parse($request->date_paid),
            ]);

            foreach ($request->transaction_details as $item) {
                foreach ($item['details'] as $detail) {
                    TransactionDetail::create([
                        'transaction_id' => $transactionHeader->id,
                        'transaction_category_id' => $item['transaction_category_id'],
                        'name' => $detail['name'],
                        'value_idr' => $detail['value_idr'],
                    ]);
                }
            }

            \DB::commit();
            return to_route('transaction.index')->with('success', 'Transaksi Baru berhasil ditambahkan.');
        } catch (\Throwable $th) {
            \DB::rollBack();
            \Log::error($th);
            return back()->with('error', 'Transaksi Baru gagal ditambahkan.');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(TransactionHeader $transactionHeader)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $transactionHeader = TransactionHeader::findOrFail($id);
        $transaction = $transactionHeader->toArray();
        $transaction['transaction_details'] = $transactionHeader->details->reduce(function ($carry, $item) {
            $carry[$item->transaction_category_id]['transaction_group_id'] = $item->transaction_category_id;
            $carry[$item->transaction_category_id]['transaction_category_id'] = $item->transaction_category_id;
            $carry[$item->transaction_category_id]['details'][] = [
                'id' => $item->id,
                'name' => $item->name,
                'value_idr' => $item->value_idr
            ];
            return $carry;
        }, []);
        $transaction['transaction_details'] = array_values($transaction['transaction_details']);
        $categories = TransactionCategory::all();

        return inertia('Transaction/Edit', compact('categories', 'transaction'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransactionUpdateRequest $request, string $id)
    {
        $transactionHeader = TransactionHeader::findOrFail($id);

        \DB::beginTransaction();
        try {
            $transactionHeader->description = $request->description;
            $transactionHeader->code = $request->code;
            $transactionHeader->rate_euro = $request->rate_euro;
            $transactionHeader->date_paid = \Carbon\Carbon::parse($request->date_paid);
            $transactionHeader->save();

            TransactionDetail::where('transaction_id', $transactionHeader->id)->delete();
            foreach ($request->transaction_details as $item) {
                foreach ($item['details'] as $detail) {
                    TransactionDetail::create([
                        'transaction_id' => $transactionHeader->id,
                        'transaction_category_id' => $item['transaction_category_id'],
                        'name' => $detail['name'],
                        'value_idr' => $detail['value_idr'],
                    ]);
                }
            }

            \DB::commit();
            return to_route('transaction.index')->with('success', 'Transaksi berhasil diubah.');
        } catch (\Throwable $th) {
            \DB::rollBack();
            \Log::error($th);
            return back()->with('error', 'Transaksi gagal diubah.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        \DB::beginTransaction();
        $transactionDetail = TransactionDetail::findOrFail($id);
        try {
            $transactionDetail->delete();
            if ($transactionDetail->header->details()->count() == 0) {
                $transactionDetail->header()->delete();
            }
            \DB::commit();
            return back()->with('success', "Transaksi $transactionDetail->name berhasil dihapus.");
        } catch (\Throwable $th) {
            \Log::error($th);
            \DB::rollBack();
            return back()->with('error', "Transaksi $transactionDetail->name gagal dihapus.");
        }

    }
}