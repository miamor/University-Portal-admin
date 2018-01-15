function loginForm () {
    $('#login').submit(function () {
        submitLoginForm();
    })
}

function submitLoginForm () {
    var type = $('#login [name="type"]:checked').val();
    $.ajax({
        url: API_URL_ALL+'/login/mod/',
        type: 'post',
        data: $('#login').serialize(),
        success: function (response) {
            console.log(response);
            if (("token" in response) == false) {
                mtip('', 'error', 'Lỗi', response.message);
            } else {
                __token = response.token;
                localStorage.setItem("token" , __token);
                localStorage.setItem("uType", type);
                localStorage.setItem("login_time" , Math.floor(Date.now() / 1000));
                console.log(__token);
                mtip('', 'success', '', 'Đăng nhập thành công! Đang chuyển hướng...');
                if ($('.popup:not(".popup-map") .load_login_form').length) {
                    remove_popup();
                } else if ($('.popup-map').length) {
                    location.reload();
                } else {
                    location.href = MAIN_URL;
                    //window.history.back();
                }
            }
        },
        error: function (a, b, c) {
            console.log(a);
            if (c == 'Unauthorized') {
                mtip('', 'error', '', 'Could not verify!');
            } else {
                //mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            }
        }
    });
    return false
}


$(document).ready(function () {
    if (localStorage.getItem('token')) { // already logged in
        location.href = MAIN_URL;
        //window.history.back();
    } else {
        loginForm();
    }
})
