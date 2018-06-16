<h3 class="menu-title">Users</h3>

<div class="menu-one-box">
    <h4 class="menu-one-box-header">Users</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->uLink ?>">List all</a>
        <a class="menu-one-item" href="<?php echo $config->uLink.'?mode=new' ?>">Add new</a>
    </div>
</div>

<div class="menu-one-box">
    <h4 class="menu-one-box-header">Groups</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->gLink ?>">List all</a>
        <a class="menu-one-item" href="<?php echo $config->gLink.'?mode=new' ?>">Add new</a>
    </div>
</div>

<div class="menu-one-box">
    <h4 class="menu-one-box-header">Me</h4>
    <div class="menu-one-box-body">
        <a class="menu-one-item" href="<?php echo $config->smLink.'/me' ?>">Edit my info</a>
        <a class="menu-one-item" href="<?php echo $config->smLink.'/me?mode=changepassword' ?>">Change my password</a>
    </div>
</div>
