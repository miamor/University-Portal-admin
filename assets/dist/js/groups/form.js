var splitURL = location.href.split('/');
var userID = splitURL[splitURL.length - 1];

(function ($) {
    FormGen = function (formType) {
        var v = $(this).attr('id');
        var u = 'group_add_members';
        $thisform = this;
        $addmemForm = $('#' + u);
        this.form = $('#' + v);
        this.membersTbl;

        this.initialize = function () {
            $('[attr-required="1"]').each(function () {
                $(this).find('.control-label, .control-labels').append(' <span class="text-danger">*</span>')
            });

            $('[name="link"]').attr('disabled', true);

            if (formType == 'edit') {
                this.loadData();
                $thisform.getGroupMem();
                $thisform.addMember();

                $.ajax({
                    url: API_URL + "/groups_getallusers",
                    type: "get",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        if (response.status == 'success') {
                            data = response.data;
                            $.each(data, function (i, val) {
                                $addmemForm.find('[name="users"]').append('<option value="' + val.username + '">' + val.name + '</option>');
                            });
                            $addmemForm.find('[name="users"]').trigger("chosen:updated");
                        }
                    }
                });

            } else {
                $thisform.find('[name="name"]').change(function () {
                    $thisform.changeLinkBaseOnName();
                });

                $('input[name="status"][value="true"]').attr('checked', true).closest('.radio').addClass('checked');
            }

            $('#' + v).submit(function () {
                $thisform.submit();
                return false
            });

        }

        this.changeLinkBaseOnName = function () {
            var name = $thisform.find('[name="name"]').val();
            $thisform.find('[name="link"]').val(locdau(name));
        }

        this.addMember = function () {
            $addmemForm.submit(function () {
                $.ajax({
                    url: API_URL + "/groups/" + userID + "/members/add",
                    type: "post",
                    data: $addmemForm.serialize(),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    },
                    success: function (response) {
                        if (response.status == 'success') {
                            //data = response.data;
                            mtip('', 'success', '', 'Thêm thành viên thành công!');
                            $thisform.membersTbl.ajax.reload();
                        }
                    }
                });
                return false
            })
        }

        this.getGroupMem = function () {
            this.membersTbl = $('#group_members').DataTable({
                ajax: {
                    url: API_URL + "/groups/" + userID + "/members",
                    type: "get",
                    dataSrc: '',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', __token);
                    }
                },
                order: [[0, 'desc']],
                pageLength: 25,
                columns: [
                    {
                        data: "username",
                        render: function (data, type, row) {
                            return '<a href="' + MAIN_URL + '/user/' + row._id + '">' + data + '</a>'
                        }
                    },
                    { data: "name" },
                    { data: "department" },
                    {
                        data: "_id",
                        render: function (data, type, row) {
                            return '<div class="row-btns"><a attr-id="' + row.username + '" title="Remove this user from group" class="row-btn-del text-danger" href="#"><i class="fa fa-trash"></i></a></div>'
                        }
                    }
                ],
                fnRowCallback: function (nRow, aData, iDisplayIndex) {
                    $(nRow).find('.row-btn-del').click(function () {
                        $thisform.removeMemGr($(this).attr('attr-id'));
                        return false
                    })
                }
            })
        }

        this.removeMemGr = function (username) {
            $.ajax({
                url: API_URL + "/groups/" + userID + "/members/remove",
                type: "post",
                data: { users: username },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    if (response.status == 'success') {
                        mtip('', 'success', '', 'Nhóm đã xóa khỏi hệ thống thành công');

                        $('.row-btn-del[attr-id="' + username + '"]').closest('tr').remove();
                    } else {
                        mtip('', 'success', '', 'Có lỗi khi xóa người dùng khỏi nhóm');
                    }
                    response = response.data;
                },
                error: function (a, b, c) {
                    console.log(a)
                }
            });
        }

        this.loadData = function () {
            $.ajax({
                url: API_URL + "/groups/" + userID,
                type: "get",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    response = response.data;
                    $('.user-name').html(response.name);

                    for (var key in response) {
                        if (key != 'permission') {
                            $('[name="' + key + '"]').val(response[key])
                        }
                    }

                    $.each(response.permission, function (i, v) {
                        $('[name="permission"] option[value="' + v + '"]').attr('selected', 'selected');
                    });

                    $('[name="permission"]').trigger("chosen:updated");
                    //$('[name="link"]').attr('disabled', 'true');
                },
                error: function (a, b, c) {
                    console.log(a)
                }
            });
        }

        this.submit = function () {
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
                var postData = $thisform.form.serialize();
                postData += '&link=' + locdau($thisform.form.find('[name="name"]').val());
                //console.log(postData);

                if (formType == 'edit') $thisform.edit(postData);
                else $thisform.add(postData);
            }
        }

        this.add = function (postData) {
            //var postData = objectifyForm($(this).serializeArray());
            //console.log(JSON.stringify(postData));
            $.ajax({
                url: API_URL + "/groups/",
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
                        mtip('', 'success', '', 'Nhóm được cập nhật thành công');
                        location.href = MAIN_URL + '/groups/' + $thisform.find('[name="link"]').val();
                    }
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        }

        this.edit = function (postData) {
            //var postData = objectifyForm($(this).serializeArray());
            //console.log(JSON.stringify(postData));
            $.ajax({
                url: API_URL + "/groups/" + userID + "/",
                type: "put",
                data: postData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    //console.log(response);
                    if (response.status == 'success') {
                        mtip('', 'success', '', 'Module cập nhật thành công');
                    } else {
                        mtip('', 'error', '', response.message);
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
