<?php

namespace App\Http\Controllers\Auth;

use App\Models\RT;
use App\Models\RW;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Warga;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $rtRwData = [];
        $allRt = RT::with('rw')->get();
        
        foreach($allRt as $rt) {
            if (!isset($rtRwData[$rt->rw->id_rw])) {
                $rtRwData[$rt->rw->id_rw] = [];
            }
            $rtRwData[$rt->rw->id_rw][] = $rt->id_rt;
        }
        // return response()->json($rtrwdata);

        return Inertia::render('Auth/Register', [
            'rtRwData' => $rtRwData,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nik_warga' => 'required|string|unique:warga,nik_warga',
            'nama' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'id_rt' => 'required|integer',
            'id_rw' => 'required|integer',
            'nama' => 'required|string',
            'nomer_kk' => 'required|string',
            'jenis_kelamin' => 'required|string',
            'phone' => 'required|string',
            'tempat_dan_tanggal_lahir' => 'required|string',
            'alamat' => 'required|string',
            'kabupaten' => 'required|string',
            'provinsi' => 'required|string',
            'agama' => 'required|string',
        ]);


        $user = User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'role' => 'Warga',
            'password' => Hash::make($request->password),
        ]);
        $warga = Warga::create([
            'nik_warga' => $request->nik_warga,
            'id_user' => $user->id,
            'id_rt' => $request->id_rt,
            'id_rw' => $request->id_rw,
            'nama' => $request->nama,
            'nomer_kk' => $request->nomer_kk,
            'jenis_kelamin' => $request->jenis_kelamin,
            'phone' => $request->phone,
            'tempat_dan_tanggal_lahir' => $request->tempat_dan_tanggal_lahir,
            'alamat' => $request->alamat,
            'kabupaten' => $request->kabupaten,
            'provinsi' => $request->provinsi,
            'agama' => $request->agama,
        ]);
        

        event(new Registered($user, $warga));
        return redirect()->route('login')->with('status', 'Registrasi suukses. Tunggu akun anda dicek oleh admin.');
    }
}
