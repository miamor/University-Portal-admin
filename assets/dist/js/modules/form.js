var splitURL = location.href.split('/');
var __menu = splitURL[splitURL.length - 1];
var currentModule;


var template = '<div class="preview"><div class="remove-thumb"><i class="fa fa-times"></i></div><span class="imageHolder"><img /><span class="uploaded"></span></span><div class="progressHolder"><div class="progress"></div></div></div>';

function createImageReal(src, div, paramname) {
    if (src.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        var preview = $(template),
            image = $('img', preview);

        image.width = 100;
        image.height = 100;

        image.attr('src', src);

        $(div).find('.message').hide();
        //preview.appendTo(div);
        $(div).next('#preview_thumbs').children('.clearfix').before(preview);
        preview.addClass('done');

        $(div).next('#preview_thumbs').find('.remove-thumb').each(function () {
            $(this).click(function (event) {
                console.log'remove_thumb clicked');
                event.stopPropagation();
                $(this).parent('.preview').hide();
                if (!$(div).find('.preview').length) {
                    $(message).show()
                }
                $('[name="'+paramname+'"]').val($('[name="'+paramname+'"]').val().replace(src, ''));
                $('[name="'+paramname+'"]').val($('[name="'+paramname+'"]').val().replace(/,+/g, ','));
            });
        })
    }
}

function createImage(file, div) {
    var preview = $(template),
        image = $('img', preview);

    var reader = new FileReader();

    image.width = 100;
    image.height = 100;

    reader.onload = function (e) {
        image.attr('src', e.target.result);
    };
    reader.readAsDataURL(file);

    $(div).find('.message').hide();
    //preview.appendTo(div);
    $(div).next('#preview_thumbs').children('.clearfix').before(preview);

    $(div).next('#preview_thumbs').find('.remove-thumb').each(function () {
        $(this).click(function (event) {
            event.stopPropagation();
            $(this).parent('.preview').hide();
            if (!$(div).find('.preview').length) {
                $(message).show()
            }
        });
    })

    // Associating a preview container
    // with the file, using jQuery's $.data():
    $.data(file, preview);
}

errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge"];


(function($) {
    FormGen = function(formType) {
        var v = $(this).attr('id');
        $thisform = this;
        this.editor_tpl = null;
        this.editor_js = null;
        this.form = $('#' + v);

        this.initialize = function() {
            $('[attr-required="1"]').each(function() {
                $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
            });

            $thisform.form.find('.nav-tabs li>a').click(function() {
                if ($(this).is('.advanced_link') && $('[name="type"]').val() == 'gallery') {
                    $('.add-form-submit').hide();
                } else {
                    $('.add-form-submit').show();
                }
            })

            // get Parent modules select list
            this.getModules();
            $('[name="type"]').change(function() {
                $('.customshow').hide();
                $('.customshow.' + $(this).val()).show();
            });

            $('[name="link"]').attr('disabled', true);

            if (formType == 'edit') {
                this.loadData();
            } else {
                $('input[name="show"][value="true"]').attr('checked', true).closest('.radio').addClass('checked');
                $('input[name="show_nav"][value="false"]').attr('checked', true).closest('.radio').addClass('checked');

                $thisform.find('[name="text"]').change(function() {
                    $thisform.changeLinkBaseOnName();
                });

                el = document.getElementById("module_template");
                text = el.innerHTML;

                $thisform.editor_tpl = ace.edit(el);
                $thisform.editor_tpl.setTheme("ace/theme/chrome");
                $thisform.editor_tpl.getSession().setMode("ace/mode/html");
                $thisform.editor_tpl.session.setValue(text);
                $thisform.editor_tpl.getSession().setUseWrapMode(true);

                $thisform.editor_js = ace.edit("module_js");
                $thisform.editor_js.setTheme("ace/theme/chrome");
                $thisform.editor_js.getSession().setMode("ace/mode/javascript");
                $thisform.editor_js.getSession().setUseWrapMode(true);
            }

            this.addImagesCtrl();

            this.form.submit(function() {
                /*if (formType == 'edit') $thisform.edit();
                else $thisform.add();*/
                $thisform.submit();
                return false
            })
        }

        this.deleteImageField = function(a) {
            $imOneDiv = $(a).closest('.image-one');
            $imOneDiv.remove();
        }

        this.deleteImage = function(a) {
            $imOneDiv = $(a).closest('.image-one');
            $.ajax({
                url: API_URL + "/images/" + $imOneDiv.attr('attr-id'),
                type: "delete",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.logresponse);
                    $thisform.deleteImageField(a);
                    mtip('', 'success', '', 'Xóa thành công');
                },
                error: function(a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
            $imOneDiv.remove();
        }

        this.addImagesCtrl = function() {
            $('.add-images').click(function() {
                $('.gallery-images').append('<div class="image-one"><div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Tiêu đề <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="name" value="" placeholder="Tiêu đề"/></div> <div class="clearfix"></div></div>   <div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Link ảnh/video <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="url" placeholder="Link ảnh/video"/></div><div class="col-lg-2 no-padding-left upload-img-button"><a href="#" onclick="javascript:formGen.uploadImageForm(this); return false" title="Upload an image from computer"><i class="fa fa-cloud-upload"></i></a></div> <div class="clearfix"></div></div>   <div class="form-group"><div class="col-lg-2 control-label">Caption</div> <div class="col-lg-8"><textarea class="form-control" attr-name="content"></textarea></div> <div class="col-lg-2 image-one-submit"><a class="btn btn-danger btn-block" href="#" onclick="javascript:formGen.deleteImageField(this); return false" title="Remove this image"><i class="fa fa-trash"></i> Delete</a> <a class="btn btn-primary btn-block" href="#" onclick="javascript:formGen.submitImage(\'add\', this); return false" title="Add this image"><i class="fa fa-check"></i> Submit</a></div> <div class="clearfix"></div></div>  </div>');
            })
        }

        this.uploadImageForm = function(a) {
            console.log('Open upload from popup');
            var uploadFormHTML = '<div id="dropbox_uploadimg" class="dropbox">\
            <span class="message"></span>\
            <div class="select-image">\
                <i class="fa fa-folder-open-o"></i> Select image\
            </div>\
            <input type="file" accept="image/*" name="img_input" class="up-file-input hidden" />\
            <input type="hidden" placeholder="Panorama image (url)" class="form-control" name="img_link" id="img_link" />\
        </div>\
        <div id="preview_thumbs" class="dropbox_previews"> <div class="clearfix"></div></div>\
        <div class="add-form-submit center">\
            <input value="Done" class="btn" type="submit" class="done-upload-img">\
        </div>';
            popup_html('<div class="popup-section section-light">' + uploadFormHTML + '</div>');
            $('.done-upload-img').click(function() {
                $(a).closest('.form-group').find('[attr-name="url"]').val($('#img_link').val());
                remove_popup();
            });
            $thisform.uploadImage();
        }


        this.uploadImage = function() {
            var dropbox = $('#dropbox_uploadimg'),
                message = $('.message', dropbox);

            dropbox.UploadImages({
                // The name of the $_FILES entry:
                paramname: 'img_input',

                maxfiles: 1,
                maxfilesize: 8,
                url: MAIN_URL + "/__request/upload_img",
                token: __token,
                dragable: false,

                uploadFinished: function(i, file, response) {
                    $.data(file).addClass('done');
                    // response is the JSON object that post_file.php returns
                    console.logresponse);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.message)
                    } else {
                        img = response.data;
                        $('#img_link').val(img);

                        var $thisImgHolder = $($.data(file)[0]);
                        $thisImgHolder.find('.remove-thumb').click(function(event) {
                            event.stopPropagation();
                            $('#img_link').val('');
                            $thisImgHolder.remove();
                        })
                    }
                },

                error: function(err, file) {
                    console.log(err);
                    switch (err) {
                        case 'BrowserNotSupported':
                            mtip('', 'error', '', 'Your browser does not support HTML5 file uploads!');
                            break;
                        case 'TooManyFiles':
                            mtip('', 'error', '', '');
                            break;
                        case 'FileTooLarge':
                            mtip('', 'error', '', file.name + ' is too large!.');
                            break;
                        default:
                            break;
                    }
                },

                // Called before each upload is started
                beforeEach: function(file) {
                    if (!file.type.match(/^image\//)) {
                        alert('Only images are allowed!');
                        return false;
                    }
                },

                uploadStarted: function(i, file, len) {
                    createImage(file, dropbox);
                },

                progressUpdated: function(i, file, progress) {
                    $.data(file).find('.progress').width(progress);
                }
            })
        }



        this.submitImage = function(submitType, a) {
            var ok = true;
            $imOneDiv = $(a).closest('.image-one');
            var postData = {};
            $imOneDiv.find('input,select,textarea').each(function() {
                postData[$(this).attr('attr-name')] = $(this).val();
                if (!$(this).is('textarea') && !$(this).val()) {
                    ok = false;
                    mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                }
            });
            // check url type
            if (!(/\.(gif|jpg|jpeg|tiff|png|mp4)$/i).test($imOneDiv.find('[attr-name="url"]').val())) {
                ok = false;
                mtip('', 'error', '', 'Link ảnh/video không hợp lệ.')
            }
            if (ok) {
                postData['module'] = __menu;
                if (submitType == 'add') $thisform.addImage(postData, $imOneDiv);
                else if (submitType == 'update') $thisform.updateImage(postData, $imOneDiv);
            }
        }

        this.addImage = function(postData, $imOneDiv) {
            $.ajax({
                url: API_URL + "/images/",
                type: "post",
                data: postData,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.logresponse);
                    $imOneDiv.attr('attr-id', response._id);
                    $(a).attr('onclick', 'javascript:formGen.submitImage(\'update\', this); return false').html('<i class="fa fa-check"></i> Update');
                    mtip('', 'success', '', 'Thêm thành công');
                },
                error: function(a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }

        this.updateImage = function(postData, $imOneDiv) {
            $.ajax({
                url: API_URL + "/images/" + $imOneDiv.attr('attr-id'),
                type: "put",
                data: postData,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.logresponse);
                    mtip('', 'success', '', 'Cập nhật thành công');
                },
                error: function(a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }


        this.getModules = function() {
            $.ajax({
                url: API_URL + "/modules",
                type: "get",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    $.each(response, function(i, v) {
                        if (!v.parent) {
                            $('[name="parent"]').append('<optgroup label="' + v.text + '"></optgroup><option value="' + v.link + '">' + v.text + '</option>');
                        } else {
                            $('[name="parent"] option[value="' + v.parent + '"]').after('<option value="' + v.link + '">|--- ' + v.text + '</option>');
                        }
                    })
                }
            });
        }

        this.loadData = function() {
            $.ajax({
                url: API_URL + "/modules/" + __menu,
                type: "get",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.logresponse);
                    if (response.status == 'success') {
                        response = response.data;

                        $('.module-name').html(response.text);
                        moduleID = response._id;
                        currentModule = response;
                        $.each(response, function(i, v) {
                            if ($('[name="' + i + '"]').length && i != 'show' && i != 'show_nav') {
                                $('[name="' + i + '"]').val(v);
                            }
                        });

                        $('[name="type"] option[value="' + response.type + '"]').attr('selected', 'selected');

                        if (__menu == 'tin-tuc') { // this is a fix module
                            $('.select-cats .col-lg-9').html('<input class="form-control" name="catt" type="text" disabled value="Tất cả"/> <input name="cat" type="hidden" value="all"/>');
                        } else {
                            $('[name="cat"] option[value="' + response.cat + '"]').attr('selected', 'selected');
                        }
                        $('input[name="show"][value="' + response.show + '"]').attr('checked', true).closest('.radio').addClass('checked');
                        $('input[name="show_nav"][value="' + response.show_nav + '"]').attr('checked', true).closest('.radio').addClass('checked');

                        $('.customshow').not('.' + response.type).hide();
                        $('.customshow.' + response.type).show();
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
                        $thisform.editor_tpl.getSession().setUseWrapMode(true);

                        $thisform.editor_js = ace.edit("module_js");
                        $thisform.editor_js.setTheme("ace/theme/chrome");
                        $thisform.editor_js.getSession().setMode("ace/mode/javascript");
                        $thisform.editor_js.getSession().setUseWrapMode(true);
                    } else {
                        //$thisform.form.html('')
                        mtip('#'+v, 'error', '', response.message, true)
                    }
                },
                error: function (a, b, c) {
                    console.log(a)
                    mtip('#'+v, 'error', '', 'Có lỗi xảy ra', true)
                }
            });
        }

        this.loadNewsSettings = function(response) {
            // get Cat select
            $.ajax({
                url: API_URL + "/categories",
                type: "get",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(r) {
                    $.each(r, function(i, v) {
                        if (!v.parent) {
                            $('[name="cat"]').append('<option value="' + v.link + '">' + v.name + '</option>');
                        } else {
                            $('[name="cat"] option[value="' + v.parent + '"]').after('<option value="' + v.link + '">|--- ' + v.name + '</option>');
                        }
                    });
                    if (typeof response.cat == 'string') {
                        $('[name="cat"] option[value="' + response.cat + '"]').attr('selected', 'selected');
                    } else {
                        $.each(response.cat, function(i, v) {
                            $('[name="cat"] option[value="' + v + '"]').attr('selected', 'selected');
                        })
                    }
                    $('[name="cat"]').trigger("chosen:updated");
                }
            });
        }

        this.getCat = function() {}

        this.loadImages = function() {
            $.ajax({
                url: API_URL + "/images/module/" + __menu,
                type: "get",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.log(response);
                    var html = '';
                    $.each(response, function(i, v) {
                        html += '<div class="image-one" attr-id="' + v._id + '"><div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Tiêu đề <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="name" value="' + v.name + '" placeholder="Tiêu đề"/></div> <div class="clearfix"></div></div>   <div class="form-group" attr-required="1"><div class="col-lg-2 control-label">Link ảnh/video <span class="text-danger">*</span></div> <div class="col-lg-8"><input class="form-control" attr-name="url" value="' + v.url + '" placeholder="Link ảnh/video"/></div><div class="col-lg-2 no-padding-left upload-img-button"><a href="#" onclick="javascript:formGen.uploadImageForm(this); return false" title="Upload an image from computer"><i class="fa fa-cloud-upload"></i></a></div> <div class="clearfix"></div></div>   <div class="form-group"><div class="col-lg-2 control-label">Caption</div> <div class="col-lg-8"><textarea class="form-control" attr-name="content">' + v.content + '</textarea></div> <div class="col-lg-2 image-one-submit"><a class="btn btn-danger btn-block" href="#" onclick="javascript:formGen.deleteImage(this); return false"><i class="fa fa-check"></i> Delete</a> <a class="btn btn-primary btn-block" href="#" onclick="javascript:formGen.submitImage(\'update\', this); return false"><i class="fa fa-check"></i> Update</a></div> <div class="clearfix"></div></div>  </div>';
                    });
                    $('.gallery-images').append(html);
                }
            })
        }

        this.changeLinkBaseOnName = function() {
            var name = $thisform.find('[name="text"]').val();
            $thisform.find('[name="link"]').val(locdau(name));
        }


        this.submit = function() {
            var ok = true;
            $thisform.find('[attr-required="1"]').each(function() {
                if (formType == 'add' || !$(this).is('.link-input')) {
                    var val = $(this).find('input,select,textarea').val();
                    if (!val) {
                        console.log('Missing parameters');
                        mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc');
                        ok = false;
                        return false;
                    }
                }
            });

            if ($thisform.find('[name="text"]').val().length < 6) {
                mtip('', 'error', '', 'Trường <b>Tên</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }
            /*if (formType == 'add') {
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
            }*/

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

            if ($thisform.form.find('[name="javascript"]').val().length) {
                // save js file to custom folder to add this to module templates
                $.ajax({
                    url: MAIN_URL + "/__request/save_js_modules",
                    type: "post",
                    //data: 'filename='+$thisform.form.find('[name="link"]').val()+'&code='+$thisform.form.find('[name="javascript"]').val(),
                    data: {
                        filename: __menu,
                        code: $thisform.form.find('[name="javascript"]').val()
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });
                $thisform.form.find('[name="javascript"]').val('true');
            } else {
                $thisform.form.find('[name="javascript"]').val('');
            }

            if (ok) {
                /*var postData = objectifyForm($thisform.form.serializeArray());
                console.log(postData);*/
                var postData = $thisform.form.serialize();
                postData += '&link='+locdau($thisform.form.find('[name="text"]').val());
                /*if (typeof postData.cat == 'string') {
                    postData.cat = [postData.cat];
                }*/
                if (formType == 'add') $thisform.add(postData);
                else $thisform.edit(postData);
            }

        }

        this.add = function(postData) {
            $.ajax({
                url: API_URL + "/modules/",
                type: "post",
                data: postData,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.log(response);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.message);
                    } else {
                        mtip('', 'success', '', 'Module cập nhật thành công');
                        location.href = MAIN_URL + '/modules/' + $thisform.find('[name="link"]').val();
                    }
                },
                error: function(a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }

        this.edit = function(postData) {
            $.ajax({
                url: API_URL + "/modules/" + __menu + "/",
                type: "put",
                data: postData, // $thisform.form.serialize()
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function(response) {
                    console.logresponse);
                    if (response.status == 'success') {
                        mtip('', 'success', '', 'Module cập nhật thành công');
                    } else {
                        mtip('', 'error', '', response.message);
                    }
                },
                error: function(a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));