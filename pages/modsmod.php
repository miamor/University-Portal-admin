<?php
$id = (isset($__pageAr[2]) ? $__pageAr[2] : null);
if ($n) {
    if ($n == 'me') {
        if ($mode == 'changepassword') {
            $pageTitle = 'Change password';
            include 'templates/header.php';

            $config->addJS('dist', $page.'/'.$mode.'.js');

            include 'templates/'.$page.'/'.$mode.'.php';
        }
        else {
            $pageTitle = 'Update my info';
            include 'templates/header.php';

            $config->addJS('dist', $page.'/me.js');

        	include 'templates/'.$page.'/me.php';
        }
    }
    else {
        if ($id) {
            $pageTitle = 'Mod info';
            include 'templates/header.php';

            //$config->addJS('plugins', 'DataTables/datatables.min.js');
            //$config->addJS('dist', 'ratings.min.js');
            //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';

            $config->addJS('dist', $page.'/form.js');
            $config->addJS('dist', $page.'/view.js');

            include 'templates/'.$page.'/view.php';
        } else if ($mode == 'new') {
            $pageTitle = 'Add new';
            include 'templates/header.php';

            $config->addJS('dist', $page.'/form.js');
            $config->addJS('dist', $page.'/'.$mode.'.js');

            include 'templates/'.$page.'/'.$mode.'.php';
        } else if ($mode == 'manage') {
            $pageTitle = 'List all (manage)';
            include 'templates/header.php';

            $config->addJS('plugins', 'DataTables/datatables.min.js');
            $config->addJS('dist', $page.'/'.$mode.'.js');

            include 'templates/'.$page.'/'.$mode.'.php';
        } else {
            $pageTitle = 'Mods list';
            include 'templates/header.php';

            $config->addJS('plugins', 'DataTables/datatables.min.js');
            $config->addJS('dist', $page.'/list.js');

            include 'templates/'.$page.'/list.php';
        }
    }
}
else {
    $pageTitle = 'Mods & smods';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', $page.'/list.js');

	//include 'templates/'.$page.'/list.php';
}
