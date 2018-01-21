<h2>Mod info || Smod info</h2>

<form id="theform" class="form-edit">
	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">Username</div>
		<div class="col-lg-9 no-padding">
			<input class="form-control" name="username" type="text" placeholder="Username"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">Name</div>
		<div class="col-lg-8 no-padding">
			<input class="form-control" name="name" placeholder="Name" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">Email</div>
		<div class="col-lg-9 no-padding">
			<input class="form-control" name="email" placeholder="Email" type="email"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label no-padding-left">Điện thoại</div>
		<div class="col-lg-8 no-padding">
			<input class="form-control" name="phone" placeholder="Điện thoại" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group form-type_action">
        <div class="col-lg-3 no-padding control-labels">Giới tính </div>
        <div class="col-lg-3 no-padding">
            <label><input name="sex" type="radio" value="true"> Nam</label>
		</div>
		<div class="col-lg-4 no-padding">
            <label><input name="sex" type="radio" value="false"> Nữ</label>
        </div>
        <div class="clearfix"></div>
    </div>

	<div class="form-group">
		<div class="col-lg-3 control-label no-padding-left">Địa chỉ</div>
		<div class="col-lg-8 no-padding">
			<input class="form-control" name="address" placeholder="Địa chỉ" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group">
		<div class="col-lg-3 control-label no-padding-left">Birthday</div>
		<div class="col-lg-8 no-padding">
			<input class="form-control" name="birthday" placeholder="Birthday" type="datetime"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group hide">
		<div class="col-lg-3 control-label no-padding-left">Coins</div>
		<div class="col-lg-9 no-padding">
			<input class="form-control" name="coin" placeholder="coin" type="number"/>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="form-group">
		<div class="col-lg-3 control-label no-padding-left">Avatar</div>
		<div class="col-lg-9 no-padding">
			<input class="form-control" name="avatar" placeholder="Avatar" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group form-type_action">
        <div class="col-lg-3 no-padding control-labels">Status </div>
		<div class="col-lg-3 no-padding">
            <label><input name="status" type="radio" value="true"> Activate</label>
		</div>
		<div class="col-lg-4 no-padding">
            <label><input name="status" type="radio" value="false"> Deactivate</label>
        </div>
        <div class="clearfix"></div>
    </div>

	<div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>
