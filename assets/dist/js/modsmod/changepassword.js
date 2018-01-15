var splitURL = location.href.split('/');
var userID = splitURL[splitURL.length-1];

function submitForm () {
    $('.form-edit-me').submit(function () {
        var ok = true;
        $('[attr-required="1"]').each(function () {
            var val = $(this).find('input,select,textarea').val();
            if ( !val ) {
                console.log('Missing parameters');
                mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                ok = false;
                return false;
            }
        });
        if (ok) {
            if ($('input[name="password"]').val() != $('input[name="password_confirm"]').val()) {
                console.log('Password confirm #');
                mtip('', 'error', '', '2 mật khẩu mới không khớp nhau');
                ok = false;
                return false;
            }
        }
        if (ok) {
            var postData = objectifyForm($(this).serializeArray());
            console.log(JSON.stringify(postData));
            $.ajax({
                url: API_URL+"/changepassword/",
                type: "put",
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    mtip('', 'success', '', 'Mật khẩu đã được cập nhật thành công');
                    location.reload();
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
        	});
        }
        return false
    })
}

$(document).ready(function () {
    $('[name="username"]').val(__userInfo.username);
    // submit form
    submitForm();
})
