<!DOCTYPE html>
<!--TODO:11-->
<!--level-11-->



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
            $header = apache_request_headers();
            if (isset($header["Authorization"])) {
                if (strpos($header["Authorization"],"Basic") !== false){
                    $value = explode(" ",$header["Authorization"]);
                    
                    if (sizeof($value) == 2) {
                        $base64decode = base64_decode($value[1],true);

                        if ($base64decode !==false ) {
                            if ($base64decode == "admin : apa"){
                                echo "good job!" . " " . "next level: " . $LEVELS["12"];
                                exit();
                            }
                        }
                    }
                }
                
            }
        
        ?>


        <section id="video-background">
               <video  autoplay muted loop src="/static/11.mp4"></video>
               <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <p class="text-white">
                            نیاز به احراز هویت
                            <br>
                            
                        </p>
                        
                    </div>
                               <div class="col-12 d-flex justify-content-center">
                        <p class="text-white">
                           admin : apa
                            <br>
                            
                        </p>
                        
                    </div>
                  </div>
               </div>
        </section>
     
    

    <script src="/bootstrap-5.3.8-dist/js/bootstrap.bundle.js"></script>
</body>

</html>