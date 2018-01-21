var splitURL = location.href.split('/');
var itemID = splitURL[splitURL.length-1];

(function($) {
    FormGen = function(formType) {
        var v = $(this).attr('id');
        $thisform = this;
        this.form = $('#'+v);

        this.initialize = function () {
            $('[attr-required="1"]').each(function () {
                $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
            });

            if (formType == 'edit') {
                this.loadData();
            } else {
                $thisform.find('[name="name"]').change(function () {
                    $thisform.changeLinkBaseOnName();
                });
            }

            this.form.submit(function () {
                if (formType == 'edit') $thisform.edit();
                else $thisform.add();
                return false
            })
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL+"/categories/"+itemID,
                type: "get",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    for (var key in response) {
                        if (key !='show' && key != 'feature') {
                            $('[name="'+key+'"]').val(response[key])
                        }
                    }

                    $('[name="cat"] option[value="'+response.cat+'"]').attr('selected', 'selected');
                    $('input[name="show"][value="'+response.show+'"]').attr('checked', true).closest('.radio').addClass('checked');
                    $('input[name="feature"][value="'+response.feature+'"]').attr('checked', true).closest('.radio').addClass('checked');

                    $('[name="link"]').attr('disabled', 'true');
                },
                error: function (a, b, c) {
                    console.log(a)
                }
        	});
        }

        this.changeLinkBaseOnName = function () {
            var name = $thisform.find('[name="name"]').val();
            $thisform.find('[name="link"]').val(locdau(name));
        }

        this.add = function () {
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

            if ($thisform.find('[name="name"]').val().length < 6) {
                mtip('', 'error', '', 'Trường <b>Tên</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }
            if ($thisform.find('[name="link"]').val().length < 6) {
                mtip('', 'error', '', 'Trường <b>Link</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }
            if ($thisform.find('[name="link"]').val().search(/[^0-9a-zA-Z\-]+/) !== -1) {
                mtip('', 'error', '', 'Trường <b>Link</b> chỉ nhận các ký tự 0-9, a-z, A-Z và gạch ngang (-)');
                ok = false;
                return false;
            }

            if (ok) {
                $.ajax({
                    url: API_URL+"/categories",
                    type: "post",
                    data: $thisform.form.serialize(),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        console.log(response);
                        mtip('', 'success', '', 'Thông tin người dùng đã được cập nhật thành công');
                        location.href = MAIN_URL+'/categories/'+$thisform.find('[name="link"]').val();
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
                if ( !val ) {
                    console.log('Missing parameters');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }
            });

            if ($thisform.find('[name="name"]').val().length < 6) {
                mtip('', 'error', '', 'Trường <b>Tên</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }

            if (ok) {
                $.ajax({
                    url: API_URL+"/categories/"+itemID+"/",
                    type: "put",
                    data: $thisform.form.serialize(),
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

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));
