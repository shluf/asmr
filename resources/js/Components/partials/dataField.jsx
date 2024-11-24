import TextInput from "@/Components/TextInput";
import { Textarea } from "@/Components/ui/textarea";

export const DataField = ({ label, value, textarea = false, readOnly = true }) => (
    <div className="grid grid-cols-4 items-center gap-4">
        <span className="font-semibold">{label}</span><div className="col-span-3 flex items-center gap-2"><div>:</div>
        { textarea ? <Textarea readOnly={readOnly} color="blue" className="w-full" value={value} ></Textarea> 
            : <TextInput readOnly={readOnly} className="w-full" value={value} />
        }
        </div>
    </div>
);