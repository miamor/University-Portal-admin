<h2>Edit my info</h2>

<form id="theform" class="form-edit-me">
	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Username</div>
		<div class="col-lg-9">
			<input class="form-control" name="username" type="text" placeholder="Username"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Name</div>
		<div class="col-lg-9">
			<input class="form-control" name="name" placeholder="Name" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

    <div class="form-group">
        <div class="control-label col-lg-3">Group</div>
        <div class="col-lg-9">
            <select class="form-control" name="group">
            </select>
        </div>
        <div class="clearfix"></div>
    </div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Email</div>
		<div class="col-lg-9">
			<input class="form-control" name="email" placeholder="Email" type="email"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Điện thoại</div>
		<div class="col-lg-9">
			<input class="form-control" name="phone" placeholder="Điện thoại" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group form-type_action">
        <div class="col-lg-3 control-labels">Giới tính </div>
        <div class="col-lg-3">
            <label><input name="sex" type="radio" value="true"> Nam</label>
		</div>
		<div class="col-lg-4">
            <label><input name="sex" type="radio" value="false"> Nữ</label>
        </div>
        <div class="clearfix"></div>
    </div>


	<div class="form-group">
		<div class="col-lg-3 control-label">Đơn vị</div>
		<div class="col-lg-9">
			<input class="form-control" name="department" placeholder="Đơn vị" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group">
		<div class="col-lg-3 control-label">Avatar</div>
		<div class="col-lg-9">
			<input class="form-control" name="avatar" placeholder="Avatar" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>
