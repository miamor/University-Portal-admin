<?php

if ($type == 'coins') {
    if ($mode == 'history') {
        $pageTitle = 'History';
        include 'templates/header.php';

        $config->addJS('plugins', 'DataTables/datatables.min.js');
    }
    else if ($mode == 'change') {
        $pageTitle = 'Update coin';
        include 'templates/header.php';
    }

    $config->addJS('dist', $page.'/'.$type.'.'.$mode.'.js');

    include 'templates/'.$page.'/'.$type.'.'.$mode.'.php';
}
else if ($n) {
    $pageTitle = 'User info';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
    $config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
    $config->addJS('plugins', 'morris/morris.min.js');

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/view.js');

    include 'templates/'.$page.'/edit.php';
}
else if ($mode == 'new') {
    $pageTitle = 'Add new';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';
}
else {
    $pageTitle = 'Users list';
    include 'templates/header.php';

    $config->addJS('plugins', 'DataTables/datatables.min.js');
    $config->addJS('dist', $page.'/list.js');

	include 'templates/'.$page.'/list.php';
}
