<div class="legendBox module-extend form-group">
    <h3 class="legendBox-header">External javascripts</h3>
    <div class="module-js">
        <textarea name="javascript" class="hidden"></textarea>
        <div class="ace-editor" id="module_js"><?php if (file_exists($__siteDir.'/assets/dist/js/modules/'.$n.'.js')) echo htmlentities(file_get_contents(WEB_URL.'/assets/dist/js/modules/'.$n.'.js')) ?></div>
    </div>
    <div class="clearfix"></div>
</div>