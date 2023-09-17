<?php

namespace App\Services;

use App\Models\TransactionDetail;

class TransactionService
{
    function datatable()
    {
        $transactionModel = new TransactionDetail();
        $transactionModel = $transactionModel
            ->join('transaction_header', 'transaction_header.id', '=', 'transaction_detail.transaction_id', 'left')
            ->join('ms_category', 'ms_category.id', '=', 'transaction_detail.transaction_category_id', 'left');

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

        $order_dir = (request()->order_dir == 'descend') ? 'desc' : 'asc';
        switch (request()->order_by) {
            case 'description':
                $transactionModel = $transactionModel->orderBy('transaction_header.description', $order_dir);
                break;
            case 'code':
                $transactionModel = $transactionModel->orderBy('transaction_header.code', $order_dir);
                break;
            case 'rate_euro':
                $transactionModel = $transactionModel->orderBy('transaction_header.rate_euro', $order_dir);
                break;
            case 'date_paid':
                $transactionModel = $transactionModel->orderBy('transaction_header.date_paid', $order_dir);
                break;
            case 'value_idr':
                $transactionModel = $transactionModel->orderBy('transaction_detail.value_idr', $order_dir);
                break;
            default:
                $transactionModel = $transactionModel->orderBy('transaction_detail.id', 'desc');
                break;
        }

        $total = $transactionModel
            ->get(['transaction_detail.*', 'transaction_header.*', 'transaction_detail.id as td_id', 'ms_category.name as category_name'])
            ->count();
        $data = $transactionModel
            ->skip(((request()->page ?? 1) - 1) * (request()->per_page ?? 10))
            ->take(request()->per_page ?? 10)
            ->get(['transaction_detail.*', 'transaction_header.*', 'transaction_detail.id as td_id', 'ms_category.name as category_name']);

        return compact('total', 'data');
    }
}