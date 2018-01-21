<h2>Edit CSS</h2>

<form id="submit_code" class="nav-tabs-custom">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#colors" data-toggle="tab">Colors</a></li>
        <li><a href="#css" data-toggle="tab">CSS</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="colors">
            <?php include 'css.colors.php' ?>
        </div>
        <div class="tab-pane" id="css">
            <div class="legendBox module-extend form-group">
                <h3 class="legendBox-header">CSS</h3>
                <div class="module-template">
                    <textarea name="code" class="hidden"></textarea>
                    <div class="ace-editor" id="css_code"><?php echo file_get_contents($__cssDir.'/site.css') ?></div>
                </div>

                <div class="clearfix"></div>
            </div>
        </div><!-- /.tab-pane -->
    </div>

    <div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>

