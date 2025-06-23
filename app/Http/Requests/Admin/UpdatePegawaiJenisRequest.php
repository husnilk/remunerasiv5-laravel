<?php

namespace App\Http\Requests\Admin;

use App\Models\PegawaiJenis;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePegawaiJenisRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming users with 'manage_datamaster' permission can update
        // return $this->user()->can('manage_datamaster');
        return true; // Temporarily true for development without permissions fully set up
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pegawaiJenisId = $this->route('pegawai_jeni') ? $this->route('pegawai_jeni')->id : null;

        return [
            'nama' => [
                'required',
                'string',
                'max:255',
                Rule::unique(PegawaiJenis::class, 'nama')->ignore($pegawaiJenisId)
            ],
            'kode' => [
                'required',
                'string',
                'max:255',
                Rule::unique(PegawaiJenis::class, 'kode')->ignore($pegawaiJenisId)
            ],
            'pegawai_ikatan_id' => [
                'required',
                'integer',
                Rule::exists('pegawai_ikatans', 'id')
            ],
            'jenis' => [
                'required',
                'string',
                Rule::in(['Dosen', 'Tendik', 'Pegawai Lainnya'])
            ],
            'has_remun' => [
                'required',
                'boolean'
            ],
        ];
    }
}
