<?php

namespace App\Http\Controllers;

use App\DataTables\TransactionDataTable;
use App\Models\TransactionCategory;
use App\Models\TransactionDetail;
use App\Models\TransactionHeader;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    function datatable(TransactionDataTable $transactionDataTable)
    {
        return $transactionDataTable->ajax();

        $transactionModel = new TransactionDetail();
        $transactionModel = $transactionModel
            ->join('transaction_header', 'transaction_header.id', '=', 'transaction_detail.transaction_id')
            ->join('ms_category', 'ms_category.id', '=', 'transaction_detail.transaction_category_id');

        $category_id = request()?->category_id;
        if ($category_id) {
            $transactionModel = $transactionModel->where('ms_category.id', $category_id);
        }

        $search = request()?->search;
        if ($search) {
            $transactionModel = $transactionModel
                ->where('transaction_header.description', 'like', '%' . $search . '%')
                ->orWhere('transaction_detail.name', 'like', '%' . $search . '%');
        }

        $date_from = request()->date_from;
        if ($date_from) {
            $transactionModel = $transactionModel->where('transaction_header.date_paid', '>=', $date_from);
        }

        $date_to = request()->date_to;
        if ($date_to) {
            $transactionModel = $transactionModel->where('transaction_header.date_paid', '<=', $date_to);
        }

        $transactions = $transactionModel->orderBy('transaction_header.id')
            ->get(['transaction_detail.*', 'transaction_header.*', 'transaction_detail.id as td_id', 'ms_category.name as category_name']);
        return response()->json(compact('transactions'));
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = TransactionCategory::all();
        return inertia('Transaction/NewIndex', compact('categories'));
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
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required',
            'code' => 'required',
            'rate_euro' => 'required|numeric',
            'date_paid' => 'required|date',
            'transaction_details' => 'required|array',
            'transaction_details.*.transaction_category_id' => 'required|numeric',
            'transaction_details.*.details' => 'required|array',
            'transaction_details.*.details.*.name' => 'required',
            'transaction_details.*.details.*.value_idr' => 'required|numeric',
        ], [
            'transaction_details.*.details.*.name.required' => 'The name field is required.',
            'transaction_details.*.details.*.value_idr.required' => 'The nominal field is required.',
            'transaction_details.*.details.*.value_idr.numeric' => 'The nominal field must be a number..',
        ]);

        \DB::beginTransaction();
        try {
            $transactionHeader = TransactionHeader::create([
                'description' => $request->description,
                'code' => $request->code,
                'rate_euro' => $request->rate_euro,
                'date_paid' => $request->date_paid,
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
    public function update(Request $request, string $id)
    {
        $transactionHeader = TransactionHeader::findOrFail($id);

        $request->validate([
            'description' => 'required',
            'code' => 'required',
            'rate_euro' => 'required|numeric',
            'date_paid' => 'required|date',
            'transaction_details' => 'required|array',
            'transaction_details.*.transaction_category_id' => 'required|numeric',
            'transaction_details.*.details' => 'required|array',
            'transaction_details.*.details.*.name' => 'required',
            'transaction_details.*.details.*.value_idr' => 'required|numeric',
        ]);

        \DB::beginTransaction();
        try {
            $transactionHeader->description = $request->description;
            $transactionHeader->code = $request->code;
            $transactionHeader->rate_euro = $request->rate_euro;
            $transactionHeader->date_paid = $request->date_paid;
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
        try {
            $transactionDetail = TransactionDetail::findOrFail($id);
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