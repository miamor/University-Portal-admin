<h2>Edit my info</h2>

<form class="form-edit-me" autocomplete="off">
	<input class="form-control hidden" name="username" type="text"/>
	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">Old password</div>
		<div class="col-lg-6 no-padding">
			<input class="form-control" name="oldpassword" type="password"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">New password</div>
		<div class="col-lg-6 no-padding">
			<input class="form-control" name="password" type="password" autocomplete="off"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">New password (confirm)</div>
		<div class="col-lg-6 no-padding">
			<input class="form-control" name="password_confirm" type="password"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>
