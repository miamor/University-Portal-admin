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

	<title><?php echo $pageTitle ?></title>
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo MAIN_URL ?>/assets/dist/images/admin_favicon.png"/>
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
	<script>var MAIN_URL = '<?php echo MAIN_URL ?>'; var WEB_URL = "<?php echo WEB_URL ?>"; var API_URL = "<?php echo API_URL ?>";</script>

</head>
<body>

<?php if ($page != 'login') { ?>
<header>
	<nav id="top_navbar" class="header_top navbar navbar-static-top">
		<div class="nav-user right">
			<a class="hide" id="me_login_link" href="<?php echo MAIN_URL ?>/login">Đăng nhập</a>
			<div class="dropdown hide" id="me_dropdown_info">
				<a href="<?php echo MAIN_URL ?>/me"">
					<img src="<?php echo MAIN_URL ?>/data/avt.png" class="nav-user-avt img-circle myAvt"/>
					<strong class="s-title myName"></strong>
					<span class="hidden myID"></span>
					<div class="clearfix"></div>
				</a>
			</div>
			<a id="me_logout_link" href="<?php echo MAIN_URL ?>/logout">Logout</a>
		</div>

		<ul class="items-list">
		</ul>

	</nav>
</header>
<?php } ?>


<div id="main-content" class="page-<?php echo $page ?>" <?php if ($page == 'login') echo 'style="margin-top:0"' ?>>
	<menu class="menu-left">
		<?php if (file_exists('pages/templates/menu/'.$page.'.php')) include 'menu/'.$page.'.php' ?>
	</menu>
	<main class="mainpage">
