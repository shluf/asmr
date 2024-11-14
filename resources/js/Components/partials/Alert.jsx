import { Check } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function Alert({
  isOpen,
  onClose,
  title = "Berhasil!!",
  message = "Pengajuan surat berhasil, silahkan tunggu status selanjutnya di laman histori pengajuan",
  color = "green"
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center text-[#2C3E50]">
            {title}
          </AlertDialogTitle>
          <div className="flex justify-center my-4">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-${color}`}>
              <Check className={`w-8 h-8 color-${color}`} />
            </div>
          </div>
          <AlertDialogDescription className="text-center text-base text-gray-600">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose}
            className="bg-[#2C3E50] text-white hover:bg-[#2C3E50]/90"
          >
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}