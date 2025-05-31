<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserApprovalStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $warga;
    public $isApproved;

    public function __construct($warga, $isApproved)
    {
        $this->warga = $warga;
        $this->isApproved = $isApproved;
    }

    public function envelope()
    {
        $subject = $this->isApproved 
            ? 'Pengajuan Anda Disetujui' 
            : 'Pengajuan Anda Ditolak';
        
        return new Envelope(
            subject: $subject,
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.user_approval_status',
            with: [
                'nama' => $this->warga->nama,
                'status' => $this->isApproved ? 'Disetujui' : 'Ditolak',
                'tindakan' => $this->isApproved ? 'dapat melakukan login' : 'tidak dapat melakukan login',
            ]
        );
    }
}