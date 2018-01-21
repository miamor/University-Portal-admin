function del (itemID) {
    $a = $('a[attr-id="'+itemID+'"]');
    console.log('del '+itemID+' called!');
    var title = $a.closest('tr').find('td:nth-child(2)').text();
    if (itemID && title) {
        if (confirm("Are you sure want to remove "+title+" permanently?")) {
            /*var row = table.row($a.closest('tr'));
            var rowNode = row.node();
            row.remove();*/

            $.ajax({
                url: API_URL+'/posts/'+itemID,
                type: 'delete',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    mtip('', 'success', '', 'Dự án đã xóa khỏi hệ thống thành công');

                    $a.closest('tr').remove();
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            })
        }
    }
    return false
}

var table;
$(document).ready(function () {
    table = $('#buyList').DataTable({
        ajax: {
            url: API_URL+"/posts",
            type: "get",
            dataSrc: '',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', __token);
            }
        },
        order: [[6, 'desc']],
		columns: [
            /*{
                data: "_id",
                render : function (data, type, row) {
                    return '<a href="'+location.href+'/'+data+'">'+data+'</a>'
                }
            },*/
            {
                data: "name",
                render : function (data, type, row) {
                    return '<a href="'+location.href+'/'+row._id+'">'+data+'</a>'
                }
            },
            {
                data: "link",
                render : function (data, type, row) {
                    return '<a href="'+location.href+'/'+row._id+'">'+data+'</a>'
                }
            },
			{ data: "cat" },
			{ data: "hashtag" },
			{ data: "author"},
			{ data: "show"},
			{ data: "updated_time"},
            {
                data: "content",
                render : function (data, type, row) {
                    return '<div class="row-btns"><a attr-id="'+row._id+'" class="row-btn-edit" href="'+location.href+'/'+row._id+'"><i class="fa fa-pencil"></i></a> <a attr-id="'+row._id+'" class="row-btn-del text-danger" href="#" onclick="javascript:del(\''+row._id+'\'); return false"><i class="fa fa-trash"></i></a></div>'
                }
            }
		],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
        }
	})
})
