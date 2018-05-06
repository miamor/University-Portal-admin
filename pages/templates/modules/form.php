<form id="theform" class="module-edit-form">

<div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
        <li class="active"><a href="#basic" class="basic_link" data-toggle="tab">Thông tin cơ bản</a></li>
        <li><a href="#advanced" class="advanced_link" data-toggle="tab">Nâng cao</a></li>
        <li><a href="#template" class="template_link" data-toggle="tab">Module template</a></li>
        <li><a href="#js" class="js_link" data-toggle="tab">External javascripts</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="basic">
            <?php include 'form.basic.php' ?>
        </div>
        <div class="tab-pane" id="advanced">
            <?php include 'form.advanced.php' ?>
        </div>
        <div class="tab-pane" id="template">
            <?php include 'form.template.php' ?>
        </div>
        <div class="tab-pane" id="js">
            <?php include 'form.js.php' ?>
        </div>
<!-- /.tab-pane -->
    </div>
    <!-- /.tab-content -->
</div>

    <div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>

</form>
