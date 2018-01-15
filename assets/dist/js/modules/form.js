var splitURL = location.href.split('/');
var __menu = splitURL[splitURL.length-1];
var currentModule;

(function($) {
    FormGen = function(formType) {
        var v = $(this).attr('id');
        $thisform = this;
        this.editor_tpl = null;
        this.editor_js = null;
        this.form = $('#'+v);

        this.initialize = function () {
            $('[attr-required="1"]').each(function () {
                $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
            });

            $thisform.form.find('.nav-tabs li>a').click(function () {
                if ($(this).is('.advanced_link') && $('[name="type"]').val() == 'gallery' ) {
                    $('.add-form-submit').hide();
                } else {
                    $('.add-form-submit').show();
                }
            })

            // get Parent modules select list
            this.getModules();
            $('[name="type"]').change(function () {
                $('.customshow').hide();
                $('.customshow.'+$(this).val()).show();
            });

            if (formType == 'edit') {
                this.loadData();
            } else {
                el = document.getElementById("module_template");
                text = el.innerHTML;

                $thisform.editor_tpl = ace.edit(el);
                $thisform.editor_tpl.setTheme("ace/theme/chrome");
                $thisform.editor_tpl.getSession().setMode("ace/mode/html");
                $thisform.editor_tpl.session.setValue(text);

                $thisform.editor_js = ace.edit("module_js");
                $thisform.editor_js.setTheme("ace/theme/chrome");
                $thisform.editor_js.getSession().setMode("ace/mode/javascript");
            }

            this.addImagesCtrl();

            this.form.submit(function () {
                if (formType == 'edit') $thisform.edit();
                else $thisform.add();
                return false
            })
        }

        this.deleteImageField = function (a) {
            $imOneDiv = $(a).closest('.image-one');
            $imOneDiv.remove();
        }

        this.deleteImage = function (a) {
            $imOneDiv = $(a).closest('.image-one');
            $.ajax({
                url: API_URL+"/images/"+$imOneDiv.attr('attr-id'),
                type: "delete",
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
                success: function (response) {
                    console.log(response);
                    $thisform.deleteImageField(a);
                    mtip('', 'success', '', 'Xóa thành công');
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        $imOneDiv.remove();
        }

        this.addImagesCtrl = function () {
            $('.add-images').click(function () {
                $('.gallery-images').append('<div class="image-one"><div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Tiêu đề <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="name" value="" placeholder="Tiêu đề"/></div> <div class="clearfix"></div></div>   <div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Link ảnh/video <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="url" placeholder="Link ảnh/video"/></div><div class="clearfix"></div></div>   <div class="form-group"><div class="col-lg-2 control-label">Caption</div> <div class="col-lg-8"><textarea class="form-control" attr-name="content"></textarea></div> <div class="col-lg-2 image-one-submit"><a class="btn btn-danger btn-block" href="#" onclick="javascript:formGen.deleteImageField(this); return false"><i class="fa fa-check"></i> Delete</a> <a class="btn btn-primary btn-block" href="#" onclick="javascript:formGen.addImage(this); return false"><i class="fa fa-check"></i> Submit</a></div> <div class="clearfix"></div></div>  </div>');
            })
        }

        this.addImage = function (a) {
            var ok = true;
            $imOneDiv = $(a).closest('.image-one');
            var postData = {};
            $imOneDiv.find('input,select,textarea').each(function () {
                postData[$(this).attr('attr-name')] = $(this).val();
                if (!$(this).is('textarea') && !$(this).val()) {
                    ok = false;
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
            });
            // check url type
            if ( !(/\.(gif|jpg|jpeg|tiff|png|mp4)$/i).test($imOneDiv.find('[attr-name="url"]').val()) ) {
                ok = false;
                mtip('', 'error', '', 'Link ảnh/video không hợp lệ.')
            }
            if (ok) {
                $.ajax({
                    url: API_URL+"/images/",
                    type: "post",
                    data: postData,
                    /*beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },*/
                    success: function (response) {
                        console.log(response);
                        $imOneDiv.attr('attr-id', response._id);
                        $(a).attr('onclick', 'javascript:formGen.updateImage(this); return false').html('<i class="fa fa-check"></i> Update');
                        mtip('', 'success', '', 'Thêm thành công');
                    },
                    error: function (a, b, c) {
                        console.log(a);
                        mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    }
            	});
            }
        }

        this.updateImage = function (a) {
            var ok = true;
            $imOneDiv = $(a).closest('.image-one');
            var postData = {};
            $imOneDiv.find('input,select,textarea').each(function () {
                postData[$(this).attr('attr-name')] = $(this).val();
                if (!$(this).is('textarea') && !$(this).val()) {
                    ok = false;
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
            });
            // check url type
            if ( !(/\.(gif|jpg|jpeg|tiff|png|mp4)$/i).test($imOneDiv.find('[attr-name="url"]').val()) ) {
                ok = false;
                mtip('', 'error', '', 'Link ảnh/video không hợp lệ.')
            }
            if (ok) {
                $.ajax({
                    url: API_URL+"/images/"+$imOneDiv.attr('attr-id'),
                    type: "put",
                    data: postData,
                    /*beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },*/
                    success: function (response) {
                        console.log(response);
                        mtip('', 'success', '', 'Cập nhật thành công');
                    },
                    error: function (a, b, c) {
                        console.log(a);
                        mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    }
                });
            }
        }


        this.getModules = function () {
            $.ajax({
                url: API_URL+"/modules",
                type: "get",
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
                success: function (response) {
                    $.each(response, function (i, v) {
                        if (!v.parent) {
                            $('[name="parent"]').append('<optgroup label="'+v.text+'"></optgroup><option value="'+v.link+'">'+v.text+'</option>');
                        } else {
                            $('[name="parent"] option[value="'+v.parent+'"]').after('<option value="'+v.link+'">|--- '+v.text+'</option>');
                        }
                    })
                }
            });
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL+"/modules/"+__menu,
                type: "get",
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
                success: function (response) {
                    console.log(response);
            
                    $('.module-name').html(response.text);
                    moduleID = response._id;
                    currentModule = response;
                    $.each(response, function (i, v) {
                        if ($('[name="'+i+'"]').length && i != 'show' && i != 'show_nav') {
                            $('[name="'+i+'"]').val(v);
                        }
                    });
                    $('[name="type"] option[value="'+response.type+'"]').attr('selected', 'selected');
                    $('[name="cat"] option[value="'+response.cat+'"]').attr('selected', 'selected');
                    $('input[name="show"][value="'+response.show+'"]').attr('checked', true).closest('.radio').addClass('checked');
                    $('input[name="show_nav"][value="'+response.show_nav+'"]').attr('checked', true).closest('.radio').addClass('checked');

                    $('.customshow.'+response.type).show();
                    if (response.type == 'gallery') {
                        $thisform.loadImages();
                    } else {
                        $thisform.loadNewsSettings(response);
                    }

                    $('#module_template').html(response.content);

                    el = document.getElementById("module_template");
                    text = el.innerHTML;

                    $thisform.editor_tpl = ace.edit(el);
                    $thisform.editor_tpl.setTheme("ace/theme/chrome");
                    $thisform.editor_tpl.getSession().setMode("ace/mode/html");
                    $thisform.editor_tpl.session.setValue(text);

                    $thisform.editor_js = ace.edit("module_js");
                    $thisform.editor_js.setTheme("ace/theme/chrome");
                    $thisform.editor_js.getSession().setMode("ace/mode/javascript");
                }
            });
        }

        this.loadNewsSettings = function (response) {
            // get Cat select
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

        this.getCat = function () {
        }

        this.loadImages = function () {
            $.ajax({
                url: API_URL+"/images",
                type: "get",
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
                success: function (response) {
                    console.log(response);
                    var html = '';
                    $.each(response, function (i, v) {
                        html += '<div class="image-one" attr-id="'+v._id+'"><div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Tiêu đề <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="name" value="'+v.name+'" placeholder="Tiêu đề"/></div> <div class="clearfix"></div></div>   <div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Link ảnh/video <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="url" value="'+v.url+'" placeholder="Link ảnh/video"/></div><div class="clearfix"></div></div>   <div class="form-group"><div class="col-lg-2 control-label">Caption</div> <div class="col-lg-8"><textarea class="form-control" attr-name="content">'+v.content+'</textarea></div> <div class="col-lg-2 image-one-submit"><a class="btn btn-danger btn-block" href="#" onclick="javascript:formGen.deleteImage(this); return false"><i class="fa fa-check"></i> Delete</a> <a class="btn btn-primary btn-block" href="#" onclick="javascript:formGen.updateImage(this); return false"><i class="fa fa-check"></i> Update</a></div> <div class="clearfix"></div></div>  </div>';
                    });
                    $('.gallery-images').append(html);
                }
            })
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
                if ($thisform.editor_tpl) {
                    var template = $thisform.editor_tpl.getValue();
                    $thisform.form.find('[name="content"]').val(template);
                }
                if ($thisform.editor_js) {
                    var exjs_code = $thisform.editor_js.getValue();
                    $thisform.form.find('[name="javascript"]').val(exjs_code);
                }
            }
            if (ok) {
                /*var postData = objectifyForm($thisform.form.serializeArray());
                console.log(postData);*/
                var postData = $thisform.form.serialize();
                /*if (typeof postData.cat == 'string') {
                    postData.cat = [postData.cat];
                }*/
                $.ajax({
                    url: API_URL+"/modules/",
                    type: "post",
                    data: postData,
                    /*beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },*/
                    success: function (response) {
                        console.log(response);
                        mtip('', 'success', '', 'Module cập nhật thành công');
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
                if ($thisform.editor_tpl) {
                    var template = $thisform.editor_tpl.getValue();
                    $thisform.form.find('[name="content"]').val(template);
                }
                if ($thisform.editor_js) {
                    var exjs_code = $thisform.editor_js.getValue();
                    $thisform.form.find('[name="javascript"]').val(exjs_code);
                }
            }
            if (ok) {
                /*var postData = objectifyForm($thisform.form.serializeArray());
                console.log(postData);*/
                var postData = $thisform.form.serialize();
                //console.log($('[name="cat"]').val());
                /*if ($('[name="cat"]').val()) {
                    postData.cat = [postData.cat];
                }*/
                $.ajax({
                    url: API_URL+"/modules/"+__menu+"/",
                    type: "put",
                    data: postData, // $thisform.form.serialize()
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        console.log(response);
                        mtip('', 'success', '', 'Module cập nhật thành công');
                    },
                    error: function (a, b, c) {
                        console.log(a);
                        mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    }
                });
                /*if ($('.advanced_link').parent('li').is('.active')) { // if modifying images
                    $thisform.submitImages();
                }*/
            }
        }

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));
