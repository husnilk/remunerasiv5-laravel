<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePegawaiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming any authenticated user with permission can update (adjust as needed)
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pegawaiId = $this->route('pegawai')->id; // Get the ID of the pegawai being updated

        return [
            'nama' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'string', 'max:20', Rule::unique('pegawais', 'nik')->ignore($pegawaiId)],
            'nip' => ['required', 'string', 'max:20', Rule::unique('pegawais', 'nip')->ignore($pegawaiId)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('pegawais', 'email')->ignore($pegawaiId)],
            'nohp' => ['nullable', 'string', 'max:20'],
            'tempat_lahir' => ['nullable', 'string', 'max:100'],
            'tanggal_lahir' => ['nullable', 'date'],
            'jenis_kelamin' => ['required', 'integer', Rule::in([1, 2])],
            'npwp' => ['nullable', 'string', 'max:25'],
            'pegawai_jenis_id' => ['required', 'integer', Rule::exists('pegawai_jenis', 'id')],
            'profile_picture' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'], // Handle new uploads
            'aktif' => ['required', 'boolean'],
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
            'pegawai_jenis_id.required' => 'The jenis pegawai field is required.',
            'pegawai_jenis_id.exists' => 'The selected jenis pegawai is invalid.',
        ];
    }
}
