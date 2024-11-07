<?php

namespace App\Http\Controllers;

use App\Models\RW;
use App\Models\ProgramKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgramKerjaController extends Controller
{
    public function index(){
        try{
            $dataProker = ProgramKerja::all();  
            return response()->json([
                'proker' => $dataProker
            ], 200);
        }catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function store(Request $request){
        $user = Auth::user();
        $rw = RW::where("id_user",$user->id)->first();
        $request->merge(["id_rw"=>$rw -> id_rw]);
        $request->validate([
            'jenis_kegiatan' => 'required',
            'tanggal' => 'required',
            'waktu' => 'required',
            'tempat' => 'required',
            'penanggung_jawab' => 'required'
        ]);
        try{
            $proker = ProgramKerja::create(array_merge(
                $request->all(),
               
            ));
            return response()->json([
                'message' => 'Data berhasil disimpan',
                'proker' => $proker
            ], 201);
        }catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function update(Request $request,$id){
        $proker = ProgramKerja::find($id);
        $request->validate([
            'id_rw' => 'required',
            'jenis_kegiatan' => 'required',
            'tanggal' => 'required',
            'waktu' => 'required',
            'tempat' => 'required',
            'penanggung_jawab' => 'required'
        ]);
        try{
            $proker->update($request->all());
            return response()->json([
                'message' => 'Data berhasil diupdate',
                'proker' => $proker
            ], 200);

        }catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengupdate data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy($id){
        try{
            $proker = ProgramKerja::find($id);
            $proker->delete();
            return response()->json([
                'message' => 'Data berhasil dihapus'
            ], 200);
        }catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
