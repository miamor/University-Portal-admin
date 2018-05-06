<form id="theform" class="form-edit-user">
	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Name</div>
		<div class="col-lg-9">
			<input class="form-control" name="name" placeholder="Name" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Link</div>
		<div class="col-lg-9">
			<input class="form-control" name="link" type="text" placeholder="Link"/>
		</div>
		<div class="clearfix"></div>
	</div>

    <div class="form-group">
        <div class="control-label col-lg-3">Description</div>
        <div class="col-lg-9">
            <textarea class="form-control" name="des"></textarea>
        </div>
        <div class="clearfix"></div>
    </div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Permissions</div>
		<div class="col-lg-9">
			<select class="form-control chosen-select" multiple name="permission">
				<option value="appearance">Appearance</option>
				<option value="categories">Categories</option>
				<option value="modules">Modules</option>
				<option value="posts">Posts</option>
				<option value="user">Users & groups</option>
            </select>
		</div>
		<div class="clearfix"></div>
	</div>


	<div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>
