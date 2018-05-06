var splitURL = location.href.split('/');
var userID = splitURL[splitURL.length - 1];

function loadGroups (gr) {
    $.ajax({
        url: API_URL + "/groups",
        type: "get",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function (r) {
            $('[name="group"]').append('<option value="">--</option>');
            $.each(r, function (i, v) {
                $('[name="group"]').append('<option value="' + v.link + '">' + v.name + '</option>');
            });
            if (gr) {
                $('[name="group"] option[value="' + gr + '"]').attr('selected', 'selected');
            }
            $('[name="group"]').attr('disabled', true);
        }
    });
}

function submitForm() {
    $('.form-edit-me').submit(function () {
        var ok = true;
        $('[attr-required="1"]').each(function () {
            var val = $(this).find('input,select,textarea').val();
            if (!val) {
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
                url: API_URL + "/me/update/",
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

function loadData() {
    $.ajax({
        url: API_URL + "/me/",
        type: "get",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function (response) {
            response = response.data;
            //$('.user-name').html(response.name)
            //$('.username').html(response.username)
            $('.username').html(response.username)
            for (var key in response) {
                if (key != 'sex' && key != 'status') {
                    $('input[name="' + key + '"]').val(response[key])
                }
            }

            loadGroups(response.group);

            $('input[name="coin"], input[name="username"]').attr('disabled', true);
            $('input[name="sex"][value="' + response.sex + '"]').attr('checked', true).closest('.radio').addClass('checked');
            //$('input[name="status"][value="' + response.status + '"]').attr('checked', true).closest('.radio').addClass('checked');
            //$('[name="type"][value="'+response.type+'"]').attr('selected', 'selected');
            $('[name="group"][value="' + response.group + '"]').attr('selected', 'selected');

            $('[name="username"]').attr('disabled', 'true');
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
