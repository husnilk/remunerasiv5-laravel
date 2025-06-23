<?php

namespace App\Http\Requests\DataMaster;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUnitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('manage_datamaster');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', Rule::unique('units', 'code')],
            'parent_id' => ['nullable', 'uuid', Rule::exists('units', 'id')],
            'has_pagu' => ['boolean'],
            'has_rubrik' => ['boolean'],
        ];
    }
}
