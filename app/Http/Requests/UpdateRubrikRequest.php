<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRubrikRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Assuming any authenticated user can update a rubrik for now
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'rubrik_kategori_id' => 'sometimes|required|exists:rubrik_kategoris,id',
            'aktifitas' => 'sometimes|required|string|max:255',
            'uraian' => 'nullable|string',
            'uraian_bukti' => 'nullable|string',
            'kode' => 'nullable|string|max:255',
            'jumlah' => 'sometimes|required|integer|min:0',
            'satuan' => 'sometimes|required|string|max:255',
            'tipe_form' => 'sometimes|required|integer',
            'personal' => 'sometimes|required|integer',
            'bukti_penugasan' => 'nullable|string|max:255',
            'bukti_kinerja' => 'nullable|string|max:255',
            'min_pegawai' => 'sometimes|required|integer|min:0',
            'max_pegawai' => 'sometimes|required|integer|min:0',
            'min_poin' => 'sometimes|required|numeric|min:0',
            'max_poin' => 'sometimes|required|numeric|min:0',
            'fixed_poin' => 'sometimes|required|numeric|min:0',
            'umum' => 'sometimes|required|integer',
            'aktif' => 'sometimes|required|integer',
            'flat_rate' => 'sometimes|required|integer',
            'rate' => 'sometimes|required|numeric|min:0',
        ];
    }
}
