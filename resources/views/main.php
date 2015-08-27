<!doctype html>
<html>
   <head>
      <title>Kathy's Garden Planner</title>
      <link rel="stylesheet" href="style.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.33.0/es6-shim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/0.9.0/fetch.min.js"></script>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <meta charset="utf-8">
      <meta name="google-signin-client_id" content="<?php echo $googleClientId; ?>">
      <meta name="viewport" content="width=device-width, initial-scale=1">
   </head>
   <body>
      <header>
         Kathy's Garden Planner
         <span id="userContainer">
            <span id="currentUser"></span>
            <span id="signInButton">
               <div
                  class="g-signin2"
                  data-onsuccess="signinSucceeded"
                  data-onfailure="signinFailed"></div>
            </span>
         </span>
      </header>
      <div id="app"></div>
      <script src="main.js"></script>
   </body>
</html>