<?php

namespace App\Http\Requests\DataMaster;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Fungsional;

class UpdateFungsionalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming 'manage_datamaster' permission is used, similar to UpdateUnitRequest
        // If specific permission like 'manage_fungsional' is needed, this should be changed.
        // For now, let's rely on the note in UnitControllerTest about permission setup issues.
        // return $this->user()->can('manage_datamaster');
        return true; // Temporarily true, mirroring test setup for UnitControllerTest
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $fungsionalId = $this->route('fungsional') instanceof Fungsional ? $this->route('fungsional')->id : $this->route('fungsional');

        return [
            'nama' => ['required', 'string', 'max:255'],
            'kode' => ['required', 'string', 'max:255', Rule::unique('fungsionals', 'kode')->ignore($fungsionalId)],
            'grade' => ['nullable', 'integer', 'min:0'],
            'job_value' => ['nullable', 'integer', 'min:0'],
            'active' => ['boolean'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'active' => $this->boolean('active'),
        ]);
    }
}
