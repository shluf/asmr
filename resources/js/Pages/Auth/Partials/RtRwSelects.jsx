import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useState, useEffect } from 'react';

const RtRwSelects = ({ data, setData, errors, rtRwData }) => {
    const [rwOptions, setRwOptions] = useState([]);
    const [rtOptions, setRtOptions] = useState([]);

    // Format dan set data saat komponen dimount atau data berubah
    useEffect(() => {
        if (rtRwData) {
            // Mengambil list RW (keys dari object)
            const availableRw = Object.keys(rtRwData).sort((a, b) => a - b);
            setRwOptions(availableRw);

            // Jika ada RW yang dipilih, update opsi RT
            if (data.id_rw) {
                updateRtOptions(data.id_rw);
            }
        }
    }, [rtRwData]);

    // Function untuk update opsi RT berdasarkan RW yang dipilih
    const updateRtOptions = (selectedRw) => {
        const availableRt = rtRwData[selectedRw] || [];
        setRtOptions(availableRt.sort((a, b) => a - b));
    };

    // Handler untuk perubahan RW
    const handleRwChange = (e) => {
        const selectedRw = e;
        setData("id_rw", selectedRw);
        setData("id_rt", "");
        
        if (selectedRw) {
            updateRtOptions(selectedRw);
        } else {
            setRtOptions([]); // Reset RT options if no RW selected
        }
    };

    return (
        <>
            <div>
                <InputLabel htmlFor="id_rw" value="RW" />
                <Select onValueChange={handleRwChange}>
                  <SelectTrigger  
                     color="yellow"      
                     id="id_rw"
                     name="id_rw"
                     required>
                    <SelectValue placeholder="Pilih RW" />
                  </SelectTrigger>
                  <SelectContent>
                  {rwOptions.map((rw) => (
                        <SelectItem key={rw} value={rw}>
                            RW {rw}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <InputError message={errors.id_rw} className="mt-1"
                />
            </div>


            <div>
                <InputLabel htmlFor="id_rt" value="RT" />
                <Select onValueChange={(value) => setData("id_rt", value)} value={data.id_rt}>
                  <SelectTrigger  
                     color="yellow"      
                     id="id_rt"
                     name="id_rt"
                     required
                     disabled={!data.id_rw}>
                    <SelectValue placeholder="Pilih RT">{`RT ${data.id_rt}`}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                  {rtOptions.map((rt) => (
                        <SelectItem key={rt} value={rt}>
                            RT {rt}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <InputError message={errors.id_rt} className="mt-1"
                />
            </div>

            
            {/* <div>
                <InputLabel htmlFor="id_rt" value="RT" />
                <select
                    id="id_rt"
                    name="id_rt"
                    value={data.id_rt}
                    onChange={(e) => setData("id_rt", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-yellow focus:border-yellow"
                    required
                    disabled={!data.id_rw}
                >
                    <option value="">Pilih RT</option>
                    {rtOptions.map((rt) => (
                        <option key={rt} value={rt}>
                            RT {rt}
                        </option>
                    ))}
                </select>
                <InputError message={errors.id_rt} className="mt-1" />
            </div> */}
        </>
    );
};

export default RtRwSelects;