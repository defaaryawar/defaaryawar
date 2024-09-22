<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tidak Siap</title>
    <!-- Google Fonts untuk font yang lebih menarik -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Poppins:wght@300&display=swap" rel="stylesheet">
    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Poppins', sans-serif;
            background-color: #f0f0f0;
        }

        .container {
            text-align: center;
            background-color: #fff;
            border: 2px solid #ff69b4;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .message {
            font-size: 2.5em;
            color: #ff69b4;
            margin-bottom: 20px;
        }

        .sub-message {
            font-size: 1.2em;
            color: #555;
            margin-bottom: 30px;
        }

        .ready-button {
            background-color: #ff69b4;
            color: white;
            font-size: 1.5em;
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .ready-button:hover {
            background-color: #ff1493;
        }

        /* Responsif untuk perangkat kecil */
        @media (max-width: 768px) {
            .message {
                font-size: 2em;
            }

            .sub-message {
                font-size: 1em;
            }

            .ready-button {
                font-size: 1.2em;
                padding: 10px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="message">Kembali lagi jika sudah siap!</div>
        <div class="sub-message">Kami tunggu sampai kamu benar-benar yakin.</div>
        <button class="ready-button" id="readyButton">Sudah Siap!</button>
    </div>

    <script>
        // Ketika tombol "Sudah Siap!" diklik, tampilkan SweetAlert untuk konfirmasi
        document.getElementById('readyButton').addEventListener('click', function() {
            Swal.fire({
                title: 'Apakah kamu yakin sudah siap?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Siap',
                cancelButtonText: 'Tidak',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Jika siap, arahkan ke halaman message
                    window.location.href = "index.php?page=0";
                } else {
                    // Jika tidak siap, tetap di halaman ini
                    Swal.fire('Oke, kami tunggu sampai kamu siap!', '', 'info');
                }
            });
        });
    </script>
</body>
</html>
