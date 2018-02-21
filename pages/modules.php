<?php
if (!isset($n)) $n = '';
if ($n) {
    $pageTitle = 'Modules - Edit';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
    //$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
    //$config->addJS('plugins', 'morris/morris.min.js');

    if ($mode != 'advanced') $mode = 'basic';

    $config->addJS('plugins', 'ace/src/ace.js');
    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/edit.js');

    include 'templates/'.$page.'/edit.php';
}
else if ($mode == 'new') {
    $pageTitle = 'Modules - Add new';
    include 'templates/header.php';

    $config->addJS('plugins', 'ace/src/ace.js');
    $config->addJS('dist', $page.'/form.js');
    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';
}
else {
    $pageTitle = 'Modules';
    include 'templates/header.php';

    $config->addJS('plugins', 'DataTables/datatables.min.js');
    $config->addJS('dist', $page.'/list.js');

	include 'templates/'.$page.'/list.php';
}
