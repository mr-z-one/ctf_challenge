<!DOCTYPE html>
<!--TODO:13-->
<!--level-13-->



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




        <section id="video-background">
               <video  autoplay muted loop src="/static/13.mp4"></video>
               <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <p class="text-white">

                          شما شکار شدید!
                            
                        </p>
                        
                    </div>
                  </div>
               </div>
        </section>
     
    

    <script src="/bootstrap-5.3.8-dist/js/bootstrap.bundle.js"></script>

    <script>

    </script>
</body>

<script >


        function xorString (a,b){
               let encoder = new TextEncoder();

                let encoded_value_a= encoder.encode(a);
                let encoded_value_b= encoder.encode(b);

                let xored = new Uint8Array(33);


                for (let index = 0; index < xored.length; index++) {
                    xored[index]= encoded_value_a[index] ^ encoded_value_b[index]
                    
                }
                
                let decoder = new TextDecoder()

                return  decoder.decode(xored)
        }


        function RUN(){
            let keys = ["PA2t5tlU97A3i6KUI9iqpISn9piwj24jx",
            "d9wOf46ZzRXP8IesCwYkM5rZ63s8ZiS74",
            "e3qCSu6Wrzdr4gxlXvx7LGF3eX50hfxwZ",
            "qQx77bW3ZrqT33jWBmn3BWHr9lk011SET",
            "IEd6158uLEkPf6IAQIwZhDdvgLH3OQhMB",
            "PDobqDWdzpQYs0NnT5JdIugbMLDKaQWbU",
            "d9wOf46ZzRXP8IesCwYkM5rZ63s8ZiS74",
            "e3qCSu6Wrzdr4gxlXvx7LGF3eX50hfxwZ",
            "IEd6158uLEkPf6IAQIwZhDdvgLH3OQhMB",
            "e3qCSu6Wrzdr4gxlXvx7LGF3eX50hfxwZ"]






                 let next_level= "خراب شده";

                

                // for (let index = 0; index <= 100; index++) {
                    
                //     next_level = xorString(next_level,keys[index % keys.length])
                    
                // }
                

                // console.log(btoa(key))

                let dd= `Ny5dEBUeAzcYFy9WEUJrOSxPDB1KaXw4awAiPVpIXjAV`;
                dd = atob(dd)

                for (let index = 100; index >= 0; index--) {
                    
                    dd = xorString(keys[index % keys.length],dd)
                    
                }
                 

                for (let index = 21; index >= 0; index--) {
                    
                    dd = xorString(keys[index % keys.length],dd)
                    
                }
                console.log(dd)  

                       for (let index = 200; index >= 0; index--) {
                    
                    dd = xorString(keys[index % keys.length],dd)
                    
                }
                console.log(dd)  



                       for (let index = 60; index >= 0; index--) {
                    
                    dd = xorString(keys[index % keys.length],dd)
                    
                }
                console.log(dd)  
        }

        
        window.onload = function() {
            setInterval(RUN,0.5)
    // Your JavaScript code here
};

    
</script>

</html>