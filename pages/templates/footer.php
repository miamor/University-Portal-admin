</main>
	<div class="clearfix"></div>
</div> <!-- #main-content -->

<?php /*if ($config->u) { ?>
	<div id="right-side" class="col-lg-2">
		<? include 'pages/chat.php'; ?>
	<? if ($config->u) { ?>
		<div class="right-bottom">
			<a href="<? echo MAIN_URL ?>/logout"><span class="fa fa-sign-out"></span> Log out</a> (@<? echo $config->me['username'] ?>)
		</div>
	<? } ?>
	</div>
<? }*/ ?>

<div class="popup hide"><div class="popup-inner">
	<div class="popup-content hide">
		<a class="popup-btn" role="close"></a>
		<div class="the-board"></div>
	</div>
</div></div>

<?php $config->echoJS() ?>

</body>
</html>
