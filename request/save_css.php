<?php
$cssCode = (isset($_POST['code']) ? $_POST['code'] : null);

// write to file
    echo file_put_contents($__siteDir.'/assets/dist/css/site.css', $cssCode);
