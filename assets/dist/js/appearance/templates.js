$(document).ready(function () {
    el = document.getElementById("template_code");
    text = el.innerHTML;

    editor_tpl = ace.edit(el);
    editor_tpl.setTheme("ace/theme/chrome");
    editor_tpl.getSession().setMode("ace/mode/html");
    editor_tpl.session.setValue(text);

    //console.log(__menu);
    $('#submit_code').submit(function () {
        $thisform = $(this);
        $thisform.find('[name="code"]').val(editor_tpl.getValue());
        $.ajax({
            url: MAIN_URL+"/request/save_tpl_modules",
            type: "post",
            data: {
                filename: __menu,
                code: $thisform.find('[name="code"]').val()
            },
            success: function (response) {
                //console.log(response);
                mtip('', 'success', '', 'Template cập nhật thành công');
            },
            error: function (a, b, c) {
                //console.log(a);
            }
        });
        return false
    })
})