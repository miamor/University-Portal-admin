<?php

if ($n) {
    $pageTitle = 'Group info';
    include 'templates/header.php';

    $config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
    //$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
    //$config->addJS('plugins', 'morris/morris.min.js');

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/edit.js');

    include 'templates/'.$page.'/edit.php';
}
else if ($mode == 'new') {
    $pageTitle = 'Add new';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';
}
else {
    $pageTitle = 'Groups list';
    include 'templates/header.php';

    $config->addJS('plugins', 'DataTables/datatables.min.js');
    $config->addJS('dist', $page.'/list.js');

	include 'templates/'.$page.'/list.php';
}
