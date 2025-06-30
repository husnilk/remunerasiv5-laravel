<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KontrakKinerjaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming all authenticated users with appropriate role/permission can manage this.
        // Adjust based on your authorization logic (e.g., check for specific permissions).
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pegawai_id' => 'required|exists:pegawais,id',
            'periode_id' => 'required|exists:periodes,id',
            'tahun' => 'required|integer|min:1900|max:' . (date('Y') + 5), // Example: current year + 5
            'bulan_mulai' => 'required|integer|min:1|max:12',
            'bulan_selesai' => 'required|integer|min:1|max:12|gte:bulan_mulai',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'penilai_id' => 'required|exists:pegawais,id|different:pegawai_id',
            'atasan_penilai_id' => 'required|exists:pegawais,id|different:pegawai_id|different:penilai_id',
            'orientasi' => 'nullable|integer|min:0|max:100', // Assuming a scale of 0-100
            'integritas' => 'nullable|integer|min:0|max:100',
            'komitmen' => 'nullable|integer|min:0|max:100',
            'disiplin' => 'nullable|integer|min:0|max:100',
            'kerjasama' => 'nullable|integer|min:0|max:100',
            'kepemimpinan' => 'nullable|integer|min:0|max:100', // Kepemimpinan might not apply to all, adjust as needed
            'keberatan' => 'nullable|string|max:2000',
            'tanggal_keberatan' => 'nullable|date',
            'tanggapan' => 'nullable|string|max:2000',
            'tanggal_tanggapan' => 'nullable|date',
            'keputusan' => 'nullable|string|max:2000',
            'tanggal_keputusan' => 'nullable|date',
            'rekomendasi' => 'nullable|string|max:2000',
            'tanggal_buat' => 'nullable|date',
            'tanggal_terima' => 'nullable|date',
            'tanggal_terima_atasan' => 'nullable|date',
            'status' => 'sometimes|integer|in:0,1,2,3', // 0: draft, 1: submitted, 2: approved, 3: rejected
            'verified_at' => 'nullable|date',
            'verified_by' => 'nullable|exists:users,id',
            'capaian_skp' => 'nullable|numeric|min:0',
            'predikat_kinerja' => 'nullable|integer', // Define specific values if it's an enum/lookup
            'rating_perilaku' => 'nullable|integer',
            'rating_kinerja' => 'nullable|integer',
            'file_bukti' => 'nullable|integer', // This seems like it should be a file path or ID. Adjust if it's a file upload.
            'poin' => 'sometimes|integer|min:0',
            'poin_verifikasi' => 'sometimes|integer|min:0',
            'file_kontrak' => 'nullable|string|max:255', // Assuming storing a path or name
            'file_kinerja' => 'nullable|string|max:255', // Assuming storing a path or name
            'tingkat_pelanggaran' => 'nullable|integer', // Define specific values if applicable
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'pegawai_id.required' => 'Pegawai harus dipilih.',
            'pegawai_id.exists' => 'Pegawai yang dipilih tidak valid.',
            'periode_id.required' => 'Periode harus dipilih.',
            'periode_id.exists' => 'Periode yang dipilih tidak valid.',
            'tahun.required' => 'Tahun harus diisi.',
            'tahun.integer' => 'Tahun harus berupa angka.',
            'tahun.min' => 'Tahun minimal 1900.',
            'tahun.max' => 'Tahun maksimal ' . (date('Y') + 5) . '.',
            'bulan_mulai.required' => 'Bulan mulai harus dipilih.',
            'bulan_mulai.integer' => 'Bulan mulai tidak valid.',
            'bulan_mulai.min' => 'Bulan mulai minimal 1.',
            'bulan_mulai.max' => 'Bulan mulai maksimal 12.',
            'bulan_selesai.required' => 'Bulan selesai harus dipilih.',
            'bulan_selesai.integer' => 'Bulan selesai tidak valid.',
            'bulan_selesai.min' => 'Bulan selesai minimal 1.',
            'bulan_selesai.max' => 'Bulan selesai maksimal 12.',
            'bulan_selesai.gte' => 'Bulan selesai harus sama atau setelah bulan mulai.',
            'penilai_id.required' => 'Penilai harus dipilih.',
            'penilai_id.exists' => 'Penilai yang dipilih tidak valid.',
            'penilai_id.different' => 'Penilai tidak boleh sama dengan pegawai yang dinilai.',
            'atasan_penilai_id.required' => 'Atasan penilai harus dipilih.',
            'atasan_penilai_id.exists' => 'Atasan penilai yang dipilih tidak valid.',
            'atasan_penilai_id.different' => 'Atasan penilai tidak boleh sama dengan pegawai atau penilai.',
            // Add more custom messages as needed
        ];
    }
}
