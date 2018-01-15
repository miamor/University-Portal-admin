<h3 class="menu-title">Users</h3>

<div class="menu-one-box">
    <h4 class="menu-one-box-header">Users</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->uLink ?>">List all</a>
        <a class="menu-one-item" href="<?php echo $config->uLink.'?mode=new' ?>">Add new</a>
    </div>
</div>

<div class="menu-one-box hidden">
    <h4 class="menu-one-box-header">Coins</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->uLink.'?type=coins&mode=history' ?>">History</a>
        <a class="menu-one-item" href="<?php echo $config->uLink.'?type=coins&mode=change' ?>">Change coin</a>
    </div>
</div>

<div class="menu-one-box mod-box">
    <h4 class="menu-one-box-header">Mods</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->mLink ?>">List all</a>
        <a class="menu-one-item smod-box" href="<?php echo $config->mLink ?>?mode=manage">List all (thuộc quyền)</a>
        <a class="menu-one-item smod-box" href="<?php echo $config->mLink ?>?mode=new">Add new</a>
    </div>
</div>

