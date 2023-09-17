<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required',
            'code' => 'required|unique:transaction_header,code,' . $this->route('transaction'),
            'rate_euro' => 'required|numeric',
            'date_paid' => 'required|date',
            'transaction_details' => 'required|array',
            'transaction_details.*.transaction_category_id' => 'required|numeric',
            'transaction_details.*.details' => 'required|array',
            'transaction_details.*.details.*.name' => 'required',
            'transaction_details.*.details.*.value_idr' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'transaction_details.*.details.*.name.required' => 'The name field is required.',
            'transaction_details.*.details.*.value_idr.required' => 'The nominal field is required.',
            'transaction_details.*.details.*.value_idr.numeric' => 'The nominal field must be a number..',
        ];
    }
}