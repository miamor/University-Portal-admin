<?php
$jsCode = (isset($_POST['code']) ? $_POST['code'] : null);
$filename = (isset($_POST['filename']) ? $_POST['filename'] : null);

// write to file
if ($filename) {
    echo file_put_contents($__siteDir.'/assets/dist/js/modules/'.$filename.'.js', $jsCode);
} else echo -1;