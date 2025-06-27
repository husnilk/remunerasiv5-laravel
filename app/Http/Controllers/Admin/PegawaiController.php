use App\Models\Fungsional;
use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\PegawaiJenis;
use App\Http\Requests\Admin\StorePegawaiRequest;
use App\Http\Requests\Admin\UpdatePegawaiRequest;
use Illuminate\Http\Request; // Keep for index if not type hinted specifically
use Illuminate\Support\Facades\Storage; // For file handling
use Inertia\Inertia;

class PegawaiController extends Controller
{
    public function index(Request $request) // Request can be kept for general query params
    {
        $query = Pegawai::with('pegawaiJenis');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%")
                  ->orWhere('nip', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $pegawais = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Pegawai/Index', [
            'pegawais' => $pegawais,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        $pegawaiJenis = PegawaiJenis::all();
        return Inertia::render('Admin/Pegawai/Create', [
            'pegawaiJenis' => $pegawaiJenis
        ]);
    }

    public function store(StorePegawaiRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_picture')) {
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        Pegawai::create($data);
        return redirect()->route('admin.pegawai.index')->with('success', 'Pegawai created successfully.');
    }

    public function show(Pegawai $pegawai)
    {
        $pegawai->load(['pegawaiJenis', 'fungsionals.fungsional']);
        $fungsionals = Fungsional::all();
        return Inertia::render('Admin/Pegawai/Show', [
            'pegawai' => $pegawai,
            'fungsionals' => $fungsionals
        ]);
    }

    public function edit(Pegawai $pegawai)
    {
        $pegawaiJenis = PegawaiJenis::all();
        return Inertia::render('Admin/Pegawai/Edit', [
            'pegawai' => $pegawai,
            'pegawaiJenis' => $pegawaiJenis
        ]);
    }

    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_picture')) {
            // Delete old picture if it exists
            if ($pegawai->profile_picture) {
                Storage::disk('public')->delete($pegawai->profile_picture);
            }
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        $pegawai->update($data);
        return redirect()->route('admin.pegawai.index')->with('success', 'Pegawai updated successfully.');
    }

    public function destroy(Pegawai $pegawai)
    {
        // Delete profile picture if it exists
        if ($pegawai->profile_picture) {
            Storage::disk('public')->delete($pegawai->profile_picture);
        }
        $pegawai->delete();
        return redirect()->route('admin.pegawai.index')->with('success', 'Pegawai deleted successfully.');
    }
}
