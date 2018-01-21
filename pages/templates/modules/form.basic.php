<div class="legendBox">
    <h3 class="legendBox-header">Thông tin cơ bản</h3>
    <div class="form-group" attr-required="1">
        <div class="control-label col-lg-3">Tên</div>
        <div class="col-lg-9">
            <input class="form-control" type="text" name="text"/>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group link-input" attr-required="1">
        <div class="control-label col-lg-3">Link</div>
        <div class="col-lg-9">
            <input class="form-control" type="text" name="link"/>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="control-label col-lg-3">Parent module</div>
        <div class="col-lg-9">
            <select class="form-control" name="parent">
                <option value="">[Không]</option>
            </select>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group" attr-required="1">
        <div class="control-label col-lg-3">Type</div>
        <div class="col-lg-9">
            <select class="form-control" name="type">
                <option value="gallery">Gallery</option>
                <option value="info">Info</option>
                <option value="news">News</option>
            </select>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="control-label col-lg-3">Left side display</div>
        <div class="col-lg-9">
            <select class="form-control" name="left">
                <option value="">[Không]</option>
                <option value="modules">Modules list</option>
                <option value="cats">Categories list</option>
            </select>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="control-label col-lg-3">Active</div>
		<div class="col-lg-3">
            <label><input name="show" type="radio" value="true"> Có</label>
		</div>
		<div class="col-lg-4">
            <label><input name="show" type="radio" value="false"> Không</label>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="control-label col-lg-3">Liên kết trên header</div>
		<div class="col-lg-3">
            <label><input name="show_nav" type="radio" value="true"> Có</label>
		</div>
		<div class="col-lg-4">
            <label><input name="show_nav" type="radio" value="false"> Không</label>
        </div>
        <div class="clearfix"></div>
    </div>
</div>