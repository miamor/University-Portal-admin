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
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
                success: function (response) {
                    for (var key in response) {
                        if (key !='show' && key != 'feature') {
                            $('[name="'+key+'"]').val(response[key])
                        }
                    }

                    $('[name="cat"] option[value="'+response.cat+'"]').attr('selected', 'selected');
                    $('input[name="show"][value="'+response.show+'"]').attr('checked', true).closest('.radio').addClass('checked');
                    $('input[name="feature"][value="'+response.feature+'"]').attr('checked', true).closest('.radio').addClass('checked');
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
                if ( !val ) {
                    console.log('Missing parameters');
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                    ok = false;
                    return false;
                }
            });
            if (ok) {
                $.ajax({
                    url: API_URL+"/categories",
                    type: "post",
                    data: $thisform.form.serialize(),
                    /*beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },*/
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
