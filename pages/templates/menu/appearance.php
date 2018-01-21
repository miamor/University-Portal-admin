<h3 class="menu-title">Appearance</h3>

<div class="menu-one-box mod-box">
    <h4 class="menu-one-box-header">Info</h4>
    <div class="menu-one-box-body">
    <a class="menu-one-item" href="<?php echo $config->aLink ?>/info">Page info</a>
    <a class="menu-one-item" href="<?php echo $config->aLink ?>/structure">Page structure</a>
    </div>
</div>

<div class="menu-one-box mod-box">
    <h4 class="menu-one-box-header">Themes</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->aLink ?>/theme">Select themes</a>
        <a class="menu-one-item" href="<?php echo $config->aLink ?>/theme_export">Export theme</a>
    </div>
</div>

<div class="menu-one-box mod-box">
    <h4 class="menu-one-box-header">Stylesheets</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->aLink ?>/css">Colors and CSS</a>
        <a class="menu-one-item" href="<?php echo $config->aLink ?>/pictures">Pictures</a>
    </div>
</div>

<div class="menu-one-box mod-box">
    <h4 class="menu-one-box-header">Templates</h4>
    <div class="menu-one-box-body">
<?php 
if ($handle = opendir($__templDir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && substr_count($entry, '.html') > 0) {
            $entry = explode('.html', $entry)[0];
            echo '<a class="menu-one-item" href="'. $config->aLink .'/templates/'.$entry.'">'.$entry.'</a>';
        }
    }
    closedir($handle);
} ?>
    </div>
</div>
