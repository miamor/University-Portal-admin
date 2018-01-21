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
            var postData = objectifyForm($(this).serializeArray());
            console.log(JSON.stringify(postData));
            $.ajax({
                url: API_URL+"/edit/",
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
        }
        return false
    })
}

function loadData () {
    $.ajax({
        url: API_URL+"/info/",
        type: "get",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function (response) {
            response = response.data;
            //$('.user-name').html(response.name)
            //$('.username').html(response.username)
            for (var key in response) {
                if (key != 'sex') {
                    $('input[name="'+key+'"]').val(response[key])
                }
            }

            $('input[name="coin"]').attr('disabled', true);
            console.log($('input[name="sex"][value="'+response.sex+'"]'));
            $('input[name="sex"][value="'+response.sex+'"]').attr('checked', true).closest('.radio').addClass('checked');
            //$('input[name="sex"][value="'+response.sex+'"]').prop('checked', true);
            //$('input[name="sex"][value="'+response.sex+'"]').setState()
        },
        error: function (a, b, c) {
            console.log(a)
        }
	});
}

$(document).ready(function () {
    loadData();

    // submit form
    submitForm();
})
