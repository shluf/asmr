<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Pengajuan</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background-color: #edf2f7;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #1BBC9B;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .email-body {
            padding: 30px;
        }
        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #777;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            color: white;
            margin-top: 10px;
        }
        .status-diterima {
            background-color: #1BBC9B;
        }
        .status-ditolak {
            background-color: #c12a2a; 
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Status Pengajuan Akun</h1>
        </div>
        <div class="email-body">
            <p>Yth. {{ $nama }},</p>
            @if($status == 'Disetujui')
            <p>Pengajuan akun Anda telah <span class="status-badge status-diterima">{{ $status }}</span>.</p>
            @elseif($status == 'Ditolak')
            <p>Pengajuan akun Anda telah <span class="status-badge status-ditolak">{{ $status }}</span>.</p>
            @endif
            <p>Sekarang anda {{ $tindakan }} pada Aplikasi Surat Menyurat RT/RW</p>
            <p>Jika Anda memiliki pertanyaan, silakan hubungi administrator.</p>
        </div>
        <div class="email-footer">
            © 2024 Aplikasi Surat Menyurat RT/RW
        </div>
    </div>
</body>
</html>