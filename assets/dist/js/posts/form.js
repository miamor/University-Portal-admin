var splitURL = location.href.split('/');
var itemID = splitURL[splitURL.length - 1];

(function ($) {
    FormGen = function (formType) {
        var v = $(this).attr('id');
        $thisform = this;
        this.form = $('#' + v);

        this.initialize = function () {
            $('[attr-required="1"]').each(function () {
                $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
            });

            $('[name="link"]').attr('disabled', true);
            
            if (formType == 'edit') {
                this.loadData();
            } else {
                $('input[name="show"][value="true"]').attr('checked', true).closest('.radio').addClass('checked');
                $('input[name="feature"][value="false"]').attr('checked', true).closest('.radio').addClass('checked');

                this.getCategories();
            }

            this.form.submit(function () {
                /*if (formType == 'edit') $thisform.edit();
                else $thisform.add();*/
                $thisform.submit();
                return false
            })
        }

        this.getCategories = function (cat) {
            $.ajax({
                url: API_URL + "/categories",
                type: "get",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (r) {
                    $.each(r, function (i, v) {
                        if (!v.parent) {
                            $('[name="cat"]').append('<option value="' + v.link + '">' + v.name + '</option>');
                        } else {
                            $('[name="cat"] option[value="' + v.parent + '"]').after('<option value="' + v.link + '">|--- ' + v.name + '</option>');
                        }
                    });
                    if (typeof cat == 'string') {
                        $('[name="cat"] option[value="' + cat + '"]').attr('selected', 'selected');
                    } else {
                        $.each(cat, function (i, v) {
                            $('[name="cat"] option[value="' + v + '"]').attr('selected', 'selected');
                        })
                    }
                    $('[name="cat"]').trigger("chosen:updated");
                }
            });
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL + "/posts/" + itemID,
                type: "get",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    if (response.status == 'success') {
                        response = response.data;

                        for (var key in response) {
                            if (key != 'show' && key != 'feature') {
                                $('[name="' + key + '"]').val(response[key])
                            }
                        }

                        $thisform.getCategories(response.cat);

                        $('input[name="show"][value="' + response.show + '"]').attr('checked', true).closest('.radio').addClass('checked');
                        $('input[name="feature"][value="' + response.feature + '"]').attr('checked', true).closest('.radio').addClass('checked');

                    } else {
                        //$thisform.form.html('')
                        mtip('#' + v, 'error', '', response.message, true)
                    }

                },
                error: function (a, b, c) {
                    //console.log(a);
                    mtip('#' + v, 'error', '', 'Có lỗi xảy ra', true)
                }
            });
        }

        this.changeLinkBaseOnName = function () {
            var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
            //console.log(timeStampInMs, Date.now());

            var name = $thisform.find('[name="name"]').val();
            $thisform.find('[name="link"]').val(locdau(name)+'-'+timeStampInMs);
        }


        this.submit = function () {
            var ok = true;
            $('[attr-required="1"]').each(function () {
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

            if ($thisform.find('[name="name"]').val().length < 6) {
                mtip('', 'error', '', 'Trường <b>Tên</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }
            /*if ($thisform.find('[name="link"]').val().length < 6) {
                mtip('', 'error', '', 'Trường <b>Link</b> phải nhận giá trị có độ dài >= 6');
                ok = false;
                return false;
            }
            if ($thisform.find('[name="link"]').val().search(/[^0-9a-zA-Z\-]+/) !== -1) {
                mtip('', 'error', '', 'Trường <b>Link</b> chỉ nhận các ký tự 0-9, a-z, A-Z và gạch ngang (-)');
                ok = false;
                return false;
            }*/

            if (ok) {
                /*var postData = objectifyForm($thisform.form.serializeArray());
                console.log(postData);*/
                var postData = $thisform.form.serialize();

                var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
                //console.log(timeStampInMs, Date.now());
    
                postData.link += '&link='+locdau($('[name="name"]').val())+'-'+timeStampInMs;
    
                /*if (typeof postData.cat == 'string') {
                    postData.cat = [postData.cat];
                }*/
                if (formType == 'add') $thisform.add(postData);
                else $thisform.edit(postData);
            }
        }

        this.add = function (postData) {
            $.ajax({
                url: API_URL + "/posts",
                type: "post",
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.message);
                    } else {
                        mtip('', 'success', '', 'Tin bài được thêm thành công');
                        location.href = MAIN_URL + '/posts/' + $thisform.find('[name="link"]').val();
                    }
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }

        this.edit = function (postData) {
            $.ajax({
                url: API_URL + "/posts/" + itemID + "/",
                type: "put",
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    if (response.status == 'error') {
                        mtip('', 'error', '', response.message);
                    } else {
                        mtip('', 'success', '', 'Tin bài được cập nhật thành công');
                    }
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }

        return this;
    }
    $.fn.FormGen = FormGen
}(jQuery));
