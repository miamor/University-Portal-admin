<form id="theform" class="form-edit-user legendBox">
    <h3 class="legendBox-header">Thông tin cơ bản</h3>
	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Tiêu đề</div>
		<div class="col-lg-9">
			<input class="form-control" name="name" placeholder="Tiêu đề bài viết" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group link-input" attr-required="1">
		<div class="col-lg-3 control-label">Link</div>
		<div class="col-lg-9">
			<input class="form-control" name="link" placeholder="Link" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group">
		<div class="col-lg-3 control-label">Thumbnail</div>
		<div class="col-lg-9">
			<input class="form-control" name="thumbnail" placeholder="Thumbnail" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group" attr-required="1">
		<div class="col-lg-3 control-label">Nội dung</div>
		<div class="col-lg-9">
			<textarea class="form-control" name="content" placeholder="Nội dung"></textarea>
		</div>
		<div class="clearfix"></div>
	</div>

    <div class="form-group" attr-required="1">
        <div class="control-label col-lg-3">Chuyên mục</div>
        <div class="col-lg-9">
            <select class="form-control chosen-select" multiple name="cat">
            </select>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="control-label col-lg-3">Tác giả</div>
        <div class="col-lg-9">
            <input class="form-control" name="author" type="text" placeholder="Tên tác giả"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
		<div class="col-lg-3 control-label">Hashtag</div>
		<div class="col-lg-9">
        <input class="form-control" name="hashtag" placeholder="Hashtag" type="text"/>
		</div>
		<div class="clearfix"></div>
	</div>

	<div class="form-group form-type_action">
        <div class="col-lg-3 control-labels">Hiển thị </div>
        <div class="col-lg-3">
            <label><input name="show" type="radio" value="true"> Có</label>
		</div>
		<div class="col-lg-4">
            <label><input name="show" type="radio" value="false"> Không</label>
        </div>
        <div class="clearfix"></div>
    </div>

	<div class="form-group form-type_action">
        <div class="col-lg-3 control-labels">Nổi bật </div>
        <div class="col-lg-3">
            <label><input name="feature" type="radio" value="true"> Có</label>
		</div>
		<div class="col-lg-4">
            <label><input name="feature" type="radio" value="false"> Không</label>
        </div>
        <div class="clearfix"></div>
    </div>


	<div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>
