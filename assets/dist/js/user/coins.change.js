$(document).ready(function () {
    $('.form-changecoin-user').submit(function () {
        var postData = objectifyForm($(this).serializeArray());
        console.log(JSON.stringify(postData));
        $.ajax({
            url: API_URL+"/change_coin/",
            type: "put",
            data: postData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', __token);
            },
            success: function (response) {
                console.log(response);
                mtip('', 'success', '', 'Thông tin người dùng đã được cập nhật thành công');
            },
            error: function (a, b, c) {
                console.log(a);
                mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            }
        });
        return false
    })
})
