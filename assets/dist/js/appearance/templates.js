$(document).ready(function () {
    var formGen = null;

    if (__AUTHED == true) {
        formGen = $('#theform').FormGen('add');
        formGen.initialize();

        el = document.getElementById("template_code");
        text = el.innerHTML;

        editor_tpl = ace.edit(el);
        editor_tpl.setTheme("ace/theme/chrome");
        editor_tpl.getSession().setMode("ace/mode/html");
        editor_tpl.session.setValue(text);
        editor_tpl.getSession().setUseWrapMode(true);
        editor_tpl.commands.addCommand({
            name: 'save',
            bindKey: { win: "Ctrl-S", "mac": "Cmd-S" },
            exec: function (editor) {
                //console.log("saving");
                $('#submit_code').submit();
            }
        });

        //console.log(__menu);
        $('#submit_code').submit(function () {
            $thisform = $(this);
            $thisform.find('[name="code"]').val(editor_tpl.getValue());
            $.ajax({
                url: MAIN_URL + "/__request/save_tpl_modules",
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
    }
})