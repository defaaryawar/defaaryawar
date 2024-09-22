<?php
// Pertanyaan untuk "nembak"
$questions = [
    "Apakah kamu juga merasakan hal yang sama sepertiku?",
    "Bersediakah kamu untuk melangkah bersamaku ke masa depan?",
    "Apakah kamu yakin akan keputusanmu untuk bersama?",
    "Aku ingin selalu mendukungmu, bersediakah kamu menjadi pelengkap dalam hidupku?",
    "Najmita Zahira Dirgantoro, apakah kamu mau menjadi pacarku?"
];

// Cek halaman saat ini
$page = isset($_GET['page']) ? (int)$_GET['page'] : 0;

// Simpan jawaban di session
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['answer'])) {
    $_SESSION['answers'][$page] = $_POST['answer'];
    $nextPage = $page + 1;
    if ($nextPage < count($questions)) {
        header("Location: nembak.php?page=$nextPage");
        exit;
    } else {
        header("Location: terimakasih.php"); // Redirect ke halaman terima kasih setelah pertanyaan terakhir
        exit;
    }
}

// Ambil jawaban sebelumnya
$answer = isset($_SESSION['answers'][$page]) ? $_SESSION['answers'][$page] : '';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pertanyaan untuk Najmita</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .choices {
            display: flex;
            justify-content: center; /* Center untuk tombol lebih baik */
            margin-top: 20px;
            width: 100%; /* Buat lebar menjadi 100% agar responsif di perangkat kecil */
            margin-left: auto;
            margin-right: auto;
            position: relative;
            max-width: 300px; /* Tambahkan batas maksimal agar tidak terlalu lebar */
        }

        .accept-button, .decline-button {
            padding: 10px 20px;
            font-size: 1.2em;
            border: none;
            cursor: pointer;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            max-width: 120px; /* Membatasi ukuran maksimal tombol */
            white-space: nowrap; /* Pastikan teks tidak pecah ke baris baru */
        }

        .accept-button {
            background-color: #ff69b4;
            color: white;
        }

        .decline-button {
            background-color: #ff6347;
            color: white;
        }
    </style>
    <!-- Tambahkan CDN untuk SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <div class="container">
        <div class="message slide-in">
            <h1><?php echo $questions[$page]; ?></h1>
        </div>

        <?php if ($page == count($questions) - 1): ?>
            <div class="choices">
                <button class="accept-button" id="yesButton">Ya</button>
                <button class="decline-button" id="noButton">Tidak</button>
            </div>
        <?php else: ?>
            <form method="POST" action="">
                <input type="text" name="answer" value="<?php echo htmlspecialchars($answer); ?>" placeholder="Isi jawabanmu di sini..." required>
                <br>
                <button type="submit" class="next-button">Next</button>
            </form>
        <?php endif; ?>
    </div>

    <div class="flower-animation"></div>

    <script>
        const noButton = document.getElementById('noButton');
        const yesButton = document.getElementById('yesButton');

        // Ketika tombol "Tidak" diklik, tampilkan SweetAlert
        noButton.addEventListener('click', function() {
            Swal.fire({
                icon: 'info',
                title: 'Ooops...',
                text: 'Kamu tidak bisa menolak!',
                confirmButtonText: 'OK'
            });
        });

        // Ketika tombol "Ya" diklik, arahkan ke halaman terima kasih
        yesButton.addEventListener('click', function() {
            Swal.fire({
                icon: 'success',
                title: 'Terima kasih!',
                text: 'Senang mendengar jawabanmu!',
                confirmButtonText: 'Lanjut'
            }).then(() => {
                window.location.href = 'terimakasih.php';
            });
        });
    </script>
</body>
</html>
