<!DOCTYPE html>
<!--TODO:08-->
<!--level-08-->
<html lang="fa" dir="rtl">
<?php    require_once __DIR__ . "/../level.php"?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>challenge</title>
    <link rel="stylesheet" href="/bootstrap-5.3.8-dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="/style.css">
</head>

<body>

        <?php

            if (strtoupper($_SERVER["REQUEST_METHOD"]) == "POST"){
                if (isset($_POST["begzar"])){
                    echo "good job!" . " " . "next level: " . $LEVELS["9"];
                    exit();
                }
            }

        ?>
        <section id="video-background">
               <video  autoplay muted loop src="/static/8.mp4"></video>
               <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                       
                        <p class="text-white">
                       از سنگ بگذر!
                  
                    </p>
                    </div>
                          <div class="col-12 d-flex justify-content-center">
                       
                                        <form method="post">
                                        <div class="form-group">
                                            <input type="hidden" class="form-control" id="begzar" name="begzar" value="بگزر" aria-describedby="emailHelp" placeholder="بگذر">
                                        </div>
                                    
                                       
                                        </form>
                        </div>
                  </div>
               </div>
        </section>
     
    

    <script src="/bootstrap-5.3.8-dist/js/bootstrap.bundle.js"></script>
</body>

</html>