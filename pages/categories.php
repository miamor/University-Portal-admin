<?php

if ($n) {
    $pageTitle = 'Edit category';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/edit.js');

    include 'templates/'.$page.'/edit.php';
}
else if ($mode == 'new') {
    $pageTitle = 'Add new category';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';
}
else {
    $pageTitle = 'Categories';
    include 'templates/header.php';

    $config->addJS('plugins', 'DataTables/datatables.min.js');
    $config->addJS('dist', $page.'/list.js');

	include 'templates/'.$page.'/list.php';
}
