<?php
$tplCode = (isset($_POST['code']) ? $_POST['code'] : null);
$filename = (isset($_POST['filename']) ? $_POST['filename'] : null);

// write to file
if ($filename) {
    //echo $__siteDir.'/pages/templates/'.$filename.'.html';
    echo file_put_contents($__siteDir.'/pages/templates/'.$filename.'.html', $tplCode);
} else echo -1;