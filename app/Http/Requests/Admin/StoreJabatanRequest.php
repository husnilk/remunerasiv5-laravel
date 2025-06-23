<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreJabatanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming any authenticated user can attempt to create for now.
        // Add specific permission checks if needed, e.g., $this->user()->can('create', Jabatan::class)
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255', Rule::unique('jabatans', 'nama')],
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
            'active' => $this->boolean('active', true), // Default to true if not present, but 'required' makes it necessary
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
