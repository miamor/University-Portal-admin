<?php //echo date("Y-m-d H:i:s");
$config->addJS('plugins', 'bootstrapValidator/bootstrapValidator.min.js');
$config->addJS('plugins', 'sceditor/minified/jquery.sceditor.min.js');
$config->addJS('dist', 'main.js'); ?>
<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMG ?>/b.jpg" />

	<title><?php echo $pageTitle ?></title>

	<!-- Bootstrap -->
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="<?php echo MAIN_URL ?>/assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?php echo CSS ?>/font.min.css">
	<!--<link rel="stylesheet" href="<?php echo CSS ?>/style.min.old.css">-->
	<link rel="stylesheet" href="<?php echo CSS ?>/plugins.css">
	<!-- Page style CSS
	<link rel="stylesheet" href="<?php echo CSS ?>/admin.min.css"> -->
	<link rel="stylesheet" href="<?php echo CSS ?>/light.css">

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="<?php echo MAIN_URL ?>/assets/jquery/jquery-2.2.3.min.js"></script>

	<link rel="stylesheet" href="<?php echo MAIN_URL ?>/assets/jquery/jquery-ui.min.css">
	<script src="<?php echo MAIN_URL ?>/assets/jquery/jquery-ui.min.js"></script>
	<!--<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-validator/0.5.3/js/bootstrapValidator.js"></script> -->

	<!-- Latest compiled and minified JavaScript -->
	<script src="<?php echo MAIN_URL ?>/assets/bootstrap/js/bootstrap.min.js"></script>
	<script>var MAIN_URL = '<?php echo MAIN_URL ?>'; var WEB_URL = "<?php echo WEB_URL ?>"</script>

</head>
<body>

<header>
	<div class="header_top">
		<div class="logo left">360land admin</div>

		<div class="nav-user right">
			<a class="hide" id="me_login_link" href="<?php echo MAIN_URL ?>/login">Đăng nhập</a>
			<div class="dropdown hide" id="me_dropdown_info">
				<a class="dropdown-toggle" data-toggle="dropdown">
					<img src="<?php echo MAIN_URL ?>/data/avt.png" class="nav-user-avt img-circle myAvt"/>
					<strong class="s-title myName"></strong>
					<span class="hidden myID"></span>
					<div class="clearfix"></div>
				</a>
				<ul class="dropdown-menu with-triangle pull-right">
					<li class="user-header">
						<img src="<?php echo MAIN_URL ?>/data/avt.png" id="meinfo_avt" class="img-circle" alt="User Image">
						<p><span id="meinfo_name"></span> - <small id="meinfo_uname">@tutu</small> (<span id="meinfo_type"></span>)</p>
					</li>
					<!-- Menu Body -->
					<li class="user-body u-sta sta-list">
						<div class="sta-one u-coins">
							<strong id="meinfo_coins"></strong>
							coins
						</div>
						<div class="sta-one u-hh">
							<strong id="meinfo_hh">12</strong>
							hh
						</div>
						<div class="sta-one u-kk">
							<strong id="meinfo_kk">5</strong>
							kk
						</div>
					</li>
					<!-- Menu Footer-->
					<li class="user-footer">
						<div class="pull-left">
							<a class="btn btn-success btn-flat" id="meinfo_profile_link" href="#">Profile</a>
						</div>
						<div class="pull-right">
							<a class="btn btn-danger btn-flat" href="<?php echo MAIN_URL ?>/logout">Logout</a>
						</div>
					</li>
				</ul>
			</div>
		</div>

	</div>
	<nav id="top_navbar" class="navbar navbar-static-top">
		<ul class="items-list">
			<li class="one-item <?php if ($page == 'appearance') echo 'active' ?>" id="news">
				<a href="<?php echo MAIN_URL ?>/appearance">General &amp; Appearance</a>
			</li>
			<li class="one-item <?php if ($page == 'modules') echo 'active' ?>" id="modules">
				<a href="<?php echo MAIN_URL ?>/modules">Modules</a>
			</li>
			<li class="one-item <?php if ($page == 'user') echo 'active' ?>" id="user">
				<a href="<?php echo MAIN_URL ?>/user">User</a>
			</li>
		</ul>

		<div class="form-search">
			<form class="search-form">
				<input name="keywords" class="search-input" placeholder="Input something..." type="text">
				<div id="search_button" class="search-button"></div>
			</form>
		</div>

	</nav>
</header>


<div id="main-content" class="page-<?php echo $page ?>">
	<menu class="menu-left col-lg-3">
		<?php if (file_exists('pages/templates/menu/'.$page.'.php')) include 'menu/'.$page.'.php' ?>
	</menu>
	<main class="col-lg-9">
