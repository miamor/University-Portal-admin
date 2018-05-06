<div class="legendBox basic-box">
	<h3 class="legendBox-header">Thông tin cơ bản</h3>
	<div class="basic">
		<?php include 'form.basic.php' ?>
	</div>
	<div class="clearfix"></div>
</div>

<?php if ($mode != 'new') { ?>
<div class="legendBox basic-box">
	<h3 class="legendBox-header">Thành viên</h3>
	<div class="basic">
		<?php include 'form.members.php' ?>
	</div>
	</div>
	<div class="clearfix"></div>
</div>
<?php } ?>