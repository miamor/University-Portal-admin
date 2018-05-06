<?php
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
