<!doctype html>
<html>
   <head>
      <title>Kathy's Garden Planner</title>
      <link rel="stylesheet" href="style.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.33.0/es6-shim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.9.0/fetch.min.js"></script>
      <script src="https://apis.google.com/js/client:platform.js" async defer></script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
   </head>
   <body>
      <header>
         Kathy's Garden Planner
         <span id="userContainer">
            <span id="currentUser"></span>
            <span id="signInButton">
               <span
                  class="g-signin"
                  data-callback="signinCallback"
                  data-clientid="<?php echo $googleClientId; ?>"
                  data-cookiepolicy="single_host_origin"
                  data-scope="profile openid"
                  data-width="iconOnly">
               </span>
            </span>
         </span>
      </header>
      <nav id="mainNavigation"></nav>
      <div id="content"></div>
      <script src="main.js"></script>
   </body>
</html>