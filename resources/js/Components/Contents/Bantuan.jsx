import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/Components/ui/button"
import { PhoneCall } from "lucide-react"

const Bantuan = () => {
  return (
    <div className='flex mt-8 md:mt-0 justify-center items-center'>
    <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Bantuan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          Mohon hubungi nomor di bawah ini jika Anda mengalami kesulitan:
        </p>
        <div className="flex items-center justify-center space-x-2">
          <PhoneCall className="w-5 h-5 text-primary" />
          <p className="font-bold text-lg">ADMIN: 0817973xxxx</p>
        </div>
        <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = 'tel:0817973xxxx'}>
          Hubungi Admin
        </Button>
      </CardContent>
    </Card>
    </div>
  )
}

export default Bantuan