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
                this.getCategories();
            }

            this.form.submit(function () {
                if (formType == 'edit') $thisform.edit();
                else $thisform.add();
                return false
            })
        }

        this.getCategories = function (response) {
            $.ajax({
                url: API_URL+"/categories",
                type: "get",
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
                success: function (r) {
                    $.each(r, function (i, v) {
                        if (!v.parent) {
                            $('[name="cat"]').append('<option value="'+v.link+'">'+v.name+'</option>');
                        } else {
                            $('[name="cat"] option[value="'+v.parent+'"]').after('<option value="'+v.link+'">|--- '+v.name+'</option>');
                        }
                    });
                    if (typeof response.cat == 'string') {
                        $('[name="cat"] option[value="'+response.cat+'"]').attr('selected', 'selected');
                    } else {
                        $.each(response.cat, function (i, v) {
                            $('[name="cat"] option[value="'+v+'"]').attr('selected', 'selected');
                        })
                    }
                    $('[name="cat"]').trigger("chosen:updated");
                }
            });
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL+"/posts/"+itemID,
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

                    $thisform.getCategories(response);

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
                /*var postData = objectifyForm($thisform.form.serializeArray());
                console.log(postData);*/
                var postData = $thisform.form.serialize();
                /*if (typeof postData.cat == 'string') {
                    postData.cat = [postData.cat];
                }*/
                $.ajax({
                    url: API_URL+"/posts",
                    type: "post",
                    data: postData,
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
                /*var postData = objectifyForm($thisform.form.serializeArray());
                console.log(postData);*/
                var postData = $thisform.form.serialize();
                /*if (typeof postData.cat == 'string') {
                    postData.cat = [postData.cat];
                }*/
                $.ajax({
                    url: API_URL+"/posts/"+itemID+"/",
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
        }

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));
