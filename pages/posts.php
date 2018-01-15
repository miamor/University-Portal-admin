<?php

if ($n) {
    $pageTitle = 'Edit post';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/edit.js');

    include 'templates/'.$page.'/edit.php';
}
else if ($mode == 'new') {
    $pageTitle = 'Add new post';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';
}
else {
    $pageTitle = 'Posts';
    include 'templates/header.php';

    $config->addJS('plugins', 'DataTables/datatables.min.js');
    $config->addJS('dist', $page.'/list.js');

	include 'templates/'.$page.'/list.php';
}
