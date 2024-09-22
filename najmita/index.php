<?php
session_start(); // Mulai sesi untuk melacak status alert

// Pesan cinta untuk setiap halaman
$messages = [
    "Najmita, kamu adalah seseorang yang sangat istimewa bagiku.",
    "Setiap detik bersamamu terasa sangat berharga.",
    "Aku selalu berharap bisa membuatmu bahagia.",
    "Kamu adalah inspirasiku dalam segala hal.",
    "Setiap senyumanmu memberikan warna baru dalam hidupku.",
    "Bersamamu, hidup terasa lebih berarti.",
    "Aku tak pernah merasa sendiri ketika kamu di sisiku.",
    "Aku ingin selalu ada di sampingmu, dalam setiap langkahmu.",
    "Najmita, kamu adalah alasan di balik kebahagiaanku.",
    "Najmita Zahira Dirgantoro, Wanita hebat yang aku temui saat ini."
];

// Cek halaman saat ini
$page = isset($_GET['page']) ? (int)$_GET['page'] : 0;

if ($page >= count($messages)) {
    header('Location: nembak.php'); // Redirect ke nembak.php setelah 10 pesan
    exit;
}

$nextPage = $page + 1;

// Jika pengguna mengunjungi halaman pertama kali (tanpa "page"), reset session alert
if ($page === 0 && !isset($_GET['alertReset'])) {
    $_SESSION['alert_shown'] = false; // Set ulang alert ke false
}

// Jika pengguna sudah menanggapi alert, jangan tampilkan lagi
if (!isset($_SESSION['alert_shown'])) {
    $_SESSION['alert_shown'] = false; // Defaultnya alert belum ditampilkan
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Untuk Najmita</title>
    <link rel="stylesheet" href="style.css">
    <!-- Tambahkan CDN SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        /* Sembunyikan kontainer di awal */
        .container {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="message slide-in">
            <h1><?php echo $messages[$page]; ?></h1>
        </div>

        <?php if ($page == 9): ?>
            <div class="photo">
                <img src="namira.jpg" alt="Najmita Zahira Dirgantoro" class="photo-img">
            </div>
        <?php endif; ?>

        <a href="index.php?page=<?php echo $nextPage; ?>" class="next-button">Next</a>
    </div>

    <div class="flower-animation"></div>

    <script>
        // Jika alert belum ditampilkan sebelumnya, tampilkan SweetAlert2
        <?php if ($_SESSION['alert_shown'] == false): ?>
        window.onload = function() {
            Swal.fire({
                title: 'Apakah kamu sudah siap?',
                text: "Apakah kamu sudah siap menjawab dan melihat seluruh noted dari Defano Arya Wardhana?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Tidak',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Jika OK, tampilkan konten halaman
                    document.querySelector('.container').style.display = 'block';
                    <?php $_SESSION['alert_shown'] = true; ?> // Set session agar alert tidak muncul lagi
                } else {
                    // Jika tidak, arahkan ke halaman tidakSiap.php
                    window.location.href = "tidakSiap.php";
                }
            });
        };
        <?php else: ?>
        // Jika alert sudah ditampilkan sebelumnya, tampilkan konten langsung
        document.querySelector('.container').style.display = 'block';
        <?php endif; ?>
    </script>
</body>
</html>
