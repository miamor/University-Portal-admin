var splitURL = location.href.split('/');
var userID = splitURL[splitURL.length - 1];

(function ($) {
    FormGen = function (formType) {
        var v = $(this).attr('id');
        $thisform = this;
        this.form = $('#' + v);

        this.initialize = function () {
            $('[attr-required="1"]').each(function () {
                $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
            });

            if (formType == 'edit') {
                this.loadData();
            } else {
                $('input[name="status"][value="true"]').attr('checked', true).closest('.radio').addClass('checked');
                $('input[name="gender"][value="true"]').attr('checked', true).closest('.radio').addClass('checked');

                this.loadGroups();
            }

            $('#' + v).submit(function () {
                if (formType == 'edit') $thisform.edit();
                else $thisform.add();
                return false
            });
        }

        this.loadGroups = function (gr) {
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
                }
            });
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL + "/users/" + userID,
                type: "get",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    $('.user-name').html(response.name)
                    $('.username').html(response.username)
                    for (var key in response) {
                        if (key != 'sex' && key != 'status') {
                            $('input[name="' + key + '"]').val(response[key])
                        }
                    }

                    $thisform.loadGroups(response.group);

                    $('input[name="coin"], input[name="username"]').attr('disabled', true);
                    $('input[name="sex"][value="' + response.sex + '"]').attr('checked', true).closest('.radio').addClass('checked');
                    $('input[name="status"][value="' + response.status + '"]').attr('checked', true).closest('.radio').addClass('checked');
                    //$('[name="type"][value="'+response.type+'"]').attr('selected', 'selected');
                    $('[name="group"][value="' + response.group + '"]').attr('selected', 'selected');

                    $('[name="username"]').attr('disabled', 'true');
                },
                error: function (a, b, c) {
                    console.log(a)
                }
            });
        }

        this.add = function () {
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

            if ($thisform.find('[name="username"]').val().length < 6) {
                mtip('', 'error', '', '<b>username</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }
            if ($thisform.find('[name="username"]').val().search(/[^0-9a-zA-Z]+/) !== -1) {
                mtip('', 'error', '', '<b>username</b> chỉ nhận các ký tự 0-9, a-z, A-Z');
                ok = false;
                return false;
            }

            if (ok) {
                //var postData = objectifyForm($(this).serializeArray());
                //console.log(JSON.stringify(postData));
                var postData = $thisform.form.serialize();
                $.ajax({
                    url: API_URL + "/users/",
                    type: "post",
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
        }

        this.edit = function () {
            var ok = true;
            $('[attr-required="1"]').not('link-input').each(function () {
                var val = $(this).find('input,select,textarea').val();
                if (!val) {
                    console.log('Missing parameters');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }
            });
            if (ok) {
                //var postData = objectifyForm($(this).serializeArray());
                //console.log(JSON.stringify(postData));
                var postData = $thisform.form.serialize();
                $.ajax({
                    url: API_URL + "/users/" + userID + "/",
                    type: "put",
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        //console.log(response);
                        mtip('', 'success', '', 'Thông tin người dùng đã được cập nhật thành công');
                    },
                    error: function (a, b, c) {
                        console.log(a);
                        mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    }
                });
            }
        }

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));
