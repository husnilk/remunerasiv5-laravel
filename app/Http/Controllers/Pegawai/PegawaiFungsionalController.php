<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\PegawaiFungsional;
use App\Http\Requests\StorePegawaiFungsionalRequest;
use App\Http\Requests\UpdatePegawaiFungsionalRequest;
use App\Models\Pegawai;

class PegawaiFungsionalController extends Controller
{
    public function index(Pegawai $pegawai)
    {
        return $pegawai->fungsionals()->with('fungsional')->get();
    }

    public function store(StorePegawaiFungsionalRequest $request, Pegawai $pegawai)
    {
        return $pegawai->fungsionals()->create($request->validated());
    }

    public function update(UpdatePegawaiFungsionalRequest $request, Pegawai $pegawai, PegawaiFungsional $fungsional)
    {
        $fungsional->update($request->validated());

        return $fungsional;
    }

    public function destroy(Pegawai $pegawai, PegawaiFungsional $fungsional)
    {
        $fungsional->delete();

        return response()->noContent();
    }
}
