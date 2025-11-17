<!DOCTYPE html>
<!--level-03-->
<!--TODO:03-->
<html lang="fa" dir="rtl">
<?php    require_once __DIR__ . "/../level.php"?>
<?php 

  if (isset($_REQUEST["jump"])){
    if (!is_array($_REQUEST["jump"])){
       $jump = $_REQUEST["jump"];
       if (strtolower($jump) == "true"){
         echo "good job!" . " " . "next level: " . $LEVELS["4"];
         exit;
       }
    }
  }

?>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>challenge</title>
    <link rel="stylesheet" href="/bootstrap-5.3.8-dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="/style.css">
</head>

<body>


        <section id="video-background">
               <video  autoplay muted loop src="/static/3.mp4"></video>
               <div class="container-fluid">
                  <div class="row">
                    <div class="col d-flex justify-content-center">
                        <p class="text-white">
                            <!--/?jump=false-->
                            باید بپری!
                    </p>
                    </div>
                  </div>
               </div>
        </section>
     
    

    <script src="/bootstrap-5.3.8-dist/js/bootstrap.bundle.js"></script>
</body>

</html>