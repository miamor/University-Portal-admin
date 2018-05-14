<?php

if (isset($n) && $n) {
    $pageTitle = $n;
    if ($n == 'templates') $pageTitle = 'Templates';
    else if ($n == 'css') $pageTitle = 'Colors & CSS';
    else if ($n == 'info') $pageTitle = 'Page info';
    else if ($n == 'structure') $pageTitle = 'Page structure';
    else if ($n == 'theme') $pageTitle = 'Select theme';
    else if ($n == 'theme_export') $pageTitle = 'Export theme';

    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
    //$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
    //$config->addJS('plugins', 'morris/morris.min.js');

    if ($n == 'templates' || $n == 'css') {
        $config->addJS('plugins', 'ace/src/ace.js');
    }
    $config->addJS('dist', $page.'/'.$n.'.js');    

    include 'templates/'.$page.'/'.$n.'.php';
}
else {
    $pageTitle = 'General & Appearance';
    include 'templates/header.php';

	include 'templates/'.$page.'/index.php';
}
