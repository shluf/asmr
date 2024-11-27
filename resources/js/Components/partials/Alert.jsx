import { useState } from "react";
import { Check, TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PrimaryButton from "../PrimaryButton";
import { Link } from "@inertiajs/react";

function Alert({
  isOpen,
  onClose,
  title = "Berhasil!!",
  desc = '',
  message = "Pengajuan surat berhasil, silahkan tunggu status selanjutnya di laman histori pengajuan",
  succes = true,
  customButton = false,
  color = "green",
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold mb-4 text-center text-[#2C3E50]">
            {title}
          </AlertDialogTitle>
          <div className="flex justify-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-${color}${succes? "" : "-600"}`}>
              { succes ?
                <Check className={`w-14 h-14   text-${color}`} />
                : <TriangleAlert className={`w-14 h-14 text-${color}-600`} />
              }
            </div>
          </div>
        </AlertDialogHeader>
          <AlertDialogDescription className="text-center text-base px-4 text-gray-600">
          <p className="text-center text-sm text-gray-400 mt-2">
            {desc}
          </p>
          <p>
            {message}
          </p>
          </AlertDialogDescription>
        <AlertDialogFooter className="sm:justify-center mt-2">
          <PrimaryButton
            color={ customButton ? "yellow" : "green"} 
            onClick={onClose}
          >
            Tutup
          </PrimaryButton>
          {customButton &&
          <Link href={route('login', { status: 'Registration successful. Tunggu akun anda dicheck oleh admin.' })} >
            <PrimaryButton
            color="green">
              Lanjutkan
            </PrimaryButton>
            </Link>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

let showAlertHelper = null;

export function showAlert({ title, succes=true, message, desc, customButton, color }) {
  if (showAlertHelper) {
    showAlertHelper({ title, message, desc, succes, customButton, color });
  }
}

export function AlertWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({
    title: "Berhasil!!",
    message: "Pengajuan surat berhasil.",
    desc: "",
    succes: true,
    customButton: false,
    color: "green",
  });

  showAlertHelper = ({ title, message, desc, succes, customButton, color }) => {
    setAlertProps({ title, message, desc, succes, customButton, color });
    setIsOpen(true);
  };

  return (
    <Alert
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={alertProps.title}
      desc={alertProps.desc}
      message={alertProps.message}
      succes={alertProps.succes}
      customButton={alertProps.customButton}
      color={alertProps.color}
    />
  );
}
