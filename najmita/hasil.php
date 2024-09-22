<?php
session_start();
$answers = isset($_SESSION['answers']) ? $_SESSION['answers'] : [];

$questions = [
    "Apakah kamu juga merasakan hal yang sama sepertiku?",
    "Bersediakah kamu untuk melangkah bersamaku ke masa depan?",
    "Apakah kamu yakin akan keputusanmu untuk bersama?",
    "Aku ingin selalu mendukungmu, bersediakah kamu menjadi pelengkap dalam hidupku?",
    "Najmita Zahira Dirgantoro, apakah kamu mau menjadi pacarku?"
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hasil Jawaban</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Hasil Jawaban Najmita</h1>
        <ul>
            <?php foreach ($questions as $index => $question): ?>
                <li>
                    <strong><?php echo $question; ?></strong><br>
                    Jawaban: <?php echo isset($answers[$index]) ? htmlspecialchars($answers[$index]) : 'Belum dijawab'; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="flower-animation"></div>
</body>
</html>
