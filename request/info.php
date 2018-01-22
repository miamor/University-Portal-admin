<?php
$siteHeader = $siteHeaderTemp = file_get_contents($__siteDir.'/pages/header_temp.php');

$matches = array();
preg_match_all("/{{page_([^}]+)}}/", $siteHeader, $matches);
foreach ($matches[1] as $mat) {
    $siteHeader = str_replace('{{page_'.$mat.'}}', $_POST[$mat], $siteHeader);
}

// write to file
file_put_contents($__siteDir.'/pages/header.php', $siteHeader);
