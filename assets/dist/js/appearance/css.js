$(document).ready(function () {
    if (__AUTHED == true) {
        editor_tpl = ace.edit('css_code');
        editor_tpl.setTheme("ace/theme/chrome");
        editor_tpl.getSession().setMode("ace/mode/css");
        editor_tpl.getSession().setUseWrapMode(true);
        //editor_tpl.setOption("indentedSoftWrap", false);
        editor_tpl.commands.addCommand({
            name: 'save',
            bindKey: { win: "Ctrl-S", "mac": "Cmd-S" },
            exec: function (editor) {
                //console.log("saving");
                $('#submit_code').submit();
            }
        });

        $('#submit_code').submit(function () {
            $thisform = $(this);
            $thisform.find('[name="code"]').val(editor_tpl.getValue());
            $.ajax({
                url: MAIN_URL + "/__request/save_css",
                type: "post",
                data: {
                    code: $thisform.find('[name="code"]').val()
                },
                success: function (response) {
                    console.log(response);
                    mtip('', 'success', '', 'CSS cập nhật thành công');
                },
                error: function (a, b, c) {
                    console.log(a);
                }
            });
            return false
        })
    }
})