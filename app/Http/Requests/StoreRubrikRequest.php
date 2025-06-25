<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRubrikRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Assuming any authenticated user can create a rubrik for now
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'rubrik_kategori_id' => 'required|exists:rubrik_kategoris,id',
            'aktifitas' => 'required|string|max:255',
            'uraian' => 'nullable|string',
            'uraian_bukti' => 'nullable|string',
            'kode' => 'nullable|string|max:255',
            'jumlah' => 'required|integer|min:0',
            'satuan' => 'required|string|max:255',
            'tipe_form' => 'required|integer',
            'personal' => 'required|integer', // Consider boolean if it's 0 or 1
            'bukti_penugasan' => 'nullable|string|max:255',
            'bukti_kinerja' => 'nullable|string|max:255',
            'min_pegawai' => 'required|integer|min:0',
            'max_pegawai' => 'required|integer|min:0',
            'min_poin' => 'required|numeric|min:0',
            'max_poin' => 'required|numeric|min:0',
            'fixed_poin' => 'required|numeric|min:0',
            'umum' => 'required|integer', // Consider boolean
            'aktif' => 'required|integer', // Consider boolean
            'flat_rate' => 'required|integer', // Consider boolean
            'rate' => 'required|numeric|min:0',
        ];
    }
}
