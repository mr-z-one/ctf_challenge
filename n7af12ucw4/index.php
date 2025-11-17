<!DOCTYPE html>
<!--TODO:05-->
<!--level-05-->

<?php    require_once __DIR__ . "/../level.php"?>

<?php 
$cookie_name = "next_level";
$cookie_value = "false";
if (!isset($_COOKIE[$cookie_name])) 
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
else {
    if ($_COOKIE[$cookie_name] == "true"){
        echo "good job!" . " " . "next level: " . $LEVELS["6"];
        exit();
    }
}
?>

<html lang="fa" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>challenge</title>
    <link rel="stylesheet" href="/bootstrap-5.3.8-dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="/style.css">
</head>

<body>


        <section id="video-background">
               <video  autoplay muted loop src="/static/5.mp4"></video>
               <div class="container-fluid">
                  <div class="row">
                    <div class="col d-flex justify-content-center">
                        <p class="text-white">
                    در سکوت فرحناک آب
                    <br>
                    هیچ کس بادبان را ندید       
                    </p>
                    </div>
                  </div>
               </div>
        </section>
     
    

    <script src="/bootstrap-5.3.8-dist/js/bootstrap.bundle.js"></script>
</body>

</html>