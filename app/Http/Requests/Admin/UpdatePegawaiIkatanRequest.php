<?php

namespace App\Http\Requests\Admin;

use App\Models\PegawaiIkatan;
use Illuminate\Foundation\Http\FormRequest;

// Import the model

class UpdatePegawaiIkatanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Replace with your actual authorization logic, e.g., Gate::allows('manage_datamaster')
        return true; // Assuming authorization is handled elsewhere or not strictly needed for this example
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $pegawaiIkatanId = $this->route('pegawai_ikatan') instanceof PegawaiIkatan ? $this->route('pegawai_ikatan')->id : $this->route('pegawai_ikatan');
        return [
            'nama' => 'required|string|max:255|unique:pegawai_ikatans,nama,' . $pegawaiIkatanId,
        ];
    }
}
