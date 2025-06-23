<?php

namespace App\Http\Requests\DataMaster;

use App\Models\Jabatan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJabatanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming any authenticated user can attempt to update for now.
        // Add specific permission checks if needed, e.g., $this->user()->can('update', $this->jabatan)
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $jabatanId = $this->route('jabatan') instanceof Jabatan ? $this->route('jabatan')->id : $this->route('jabatan');

        return [
            'nama' => ['required', 'string', 'max:255', Rule::unique('jabatans', 'nama')->ignore($jabatanId)],
            'grade' => ['required', 'integer', 'min:1'],
            'job_value' => ['required', 'integer', 'min:0'],
            'cg' => ['required', 'boolean'],
            'poin_skp' => ['nullable', 'integer', 'min:0'],
            'active' => ['required', 'boolean'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'cg' => $this->boolean('cg'),
            'active' => $this->boolean('active'),
        ]);
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama.required' => 'Nama jabatan harus diisi.',
            'nama.unique' => 'Nama jabatan sudah ada.',
            'grade.required' => 'Grade harus diisi.',
            'grade.integer' => 'Grade harus berupa angka.',
            'job_value.required' => 'Job value harus diisi.',
            'job_value.integer' => 'Job value harus berupa angka.',
        ];
    }
}
