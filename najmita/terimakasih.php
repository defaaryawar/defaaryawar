<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih Cantiku</title>
    <!-- Menggunakan font dari Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Poppins:wght@600&family=Raleway:wght@800&display=swap" rel="stylesheet">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: 'Poppins', sans-serif;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #000;
        }

        /* Kontainer teks */
        .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #fff;
        }

        .thank-you-message, .name {
            opacity: 0; /* Tidak terlihat pada awalnya */
            color: #fff; /* Ganti warna teks menjadi putih */
        }

        .thank-you-message {
            font-family: 'Dancing Script', cursive; /* Terapkan font Dancing Script */
            font-size: 4em;
            line-height: 1.5;
            word-spacing: 0.1em;
            letter-spacing: 2px;
            animation: slideInFromLeft 2s ease-out forwards;
        }

        .name {
            font-family: 'Dancing Script', cursive; /* Terapkan font Dancing Script */
            font-size: 4em;
            margin-top: 20px;
            animation: slideInFromRight 2s ease-out forwards;
            animation-delay: 1s;
        }

        /* Background video */
        .background-video {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }

        /* Animasi slide-in dari kiri untuk "Terima Kasih Cantiku" */
        @keyframes slideInFromLeft {
            0% {
                transform: translateX(-100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* Animasi slide-in dari kanan untuk "Najmita Zahira Dirgantoro" */
        @keyframes slideInFromRight {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* Responsivitas untuk layar kecil */
        @media (max-width: 768px) {
            .thank-you-message {
                font-size: 2.5em;
            }

            .name {
                font-size: 3em;
            }
        }

        @media (max-width: 480px) {
            .thank-you-message {
                font-size: 2em;
            }

            .name {
                font-size: 2.5em;
            }
        }
    </style>
</head>
<body>
    <!-- Video Background -->
    <video class="background-video" autoplay loop muted>
        <source src="hati.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <!-- Kontainer Teks -->
    <div class="container">
        <div class="thank-you-message">Terima Kasih Cantiku</div>
        <div class="name">NAJMITA ZAHIRA DIRGANTORO</div>
    </div>
</body>
</html>
