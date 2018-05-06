<h2>Edit template</h2>

<form id="submit_code">
    <div class="legendBox module-extend form-group">
        <h3 class="legendBox-header"><?php echo $m ?> template</h3>
        <div class="module-template">
            <textarea name="code" class="hidden"></textarea>
            <div class="ace-editor" id="template_code"><?php echo file_get_contents($__templDir.'/'.$m.'.html') ?></div>
        </div>

        <div class="clearfix"></div>
    </div>

    <div class="add-form-submit center">
		<input type="reset" value="Reset" class="btn btn-default">
		<input type="submit" value="Submit" class="btn">
	</div>
</form>
<script>var __menu = '<?php echo $m ?>';</script>