<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRubrikKategoriRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Assuming any authenticated user can update
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rubrikKategoriId = $this->route('rubrik_kategori')->id;

        return [
            'nama' => 'required|string|max:255',
            'kode' => [
                'required',
                'string',
                'max:255',
                Rule::unique('rubrik_kategoris', 'kode')->ignore($rubrikKategoriId),
            ],
            'rubrik_remun_id' => 'required|exists:rubrik_remuns,id',
        ];
    }
}
