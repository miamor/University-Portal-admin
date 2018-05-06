var splitURL = location.href.split('/');
var userID = splitURL[splitURL.length-1];

(function($) {
    FormGen = function(formType) {
        var v = $(this).attr('id');
        $thisform = this;
        this.form = $('#'+v);

        this.initialize = function () {
            this.loadData();

            $('#'+v).submit(function () {
                $thisform.edit();
                return false
            })
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL+"/info",
                type: "get",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    var tit = '';
                    for (var key in response) {
                        if (key == 'description') {
                            tit = 'Mô tả';
                            $('#loadData').append('<div class="form-group link-input" attr-required="1">\
                            <div class="col-lg-3 control-label">'+tit+'</div>\
                            <div class="col-lg-9">\
                                <textarea class="form-control" name="'+key+'">'+response[key]+'</textarea>\
                            </div>\
                            <div class="clearfix"></div>\
                        </div>');
                        } else if (key == 'contact_email') {
                            tit = 'Email liên hệ';
                            $('#loadData').append('<div class="form-group link-input" attr-required="1">\
                            <div class="col-lg-3 control-label">'+tit+'</div>\
                            <div class="col-lg-9">\
                            <input class="form-control" name="'+key+'" type="email" value="'+response[key]+'"/>\
                            </div>\
                            <div class="clearfix"></div>\
                        </div>');
                        } else if (key != '_id' && key != 'updated_time') {
                            if (key == 'title') tit = 'Tiêu đề';
                            else if (key == 'url') tit = 'Site URL';
                            else if (key == 'image') tit = 'Image';
                            else if (key == 'ico' || key == 'favicon') tit = 'Favicon';
                            else if (key == 'keywords') tit = 'Keywords';
                            else if (key == 'address') tit = 'Địa chỉ';
                            else if (key == 'phone') tit = 'Điện thoại';

                            $('#loadData').append('<div class="form-group" attr-required="1">\
                            <div class="col-lg-3 control-label">'+tit+'</div>\
                            <div class="col-lg-9">\
                                <input class="form-control" name="'+key+'" type="text" value="'+response[key]+'"/>\
                            </div>\
                            <div class="clearfix"></div>\
                        </div>');
                        }
                        //$('[name="'+key+'"]').val(response[key])
                    }
                    $('[attr-required="1"]').each(function () {
                        $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
                    });
                },
                error: function (a, b, c) {
                    console.log(a)
                }
        	});
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
            if (ok) {
                //var postData = objectifyForm($(this).serializeArray());
                //console.log(JSON.stringify(postData));
                var postData = $thisform.form.serialize();

                $.ajax({
                    url: MAIN_URL+"/__request/save_info",
                    type: "post",
                    data: postData,
                    success: function (response) {
                        console.log(response);
                        //mtip('', 'success', '', 'Template cập nhật thành công');
                    },
                    error: function (a, b, c) {
                        console.log(a);
                    }
                });
        
                $.ajax({
                    url: API_URL+"/info/update",
                    type: "put",
                    data: postData,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        //console.log(response);
                        mtip('', 'success', '', 'Thông tin website đã được cập nhật thành công');
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


$(document).ready(function () {
    if (__AUTHED == true) {
        var FormGen = $('#theform').FormGen('edit');
        FormGen.initialize();
    }
})