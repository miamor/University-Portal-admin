$(document).ready(function () {
    $.getJSON(API_URL+'/modules/full', function (response) {
        console.log(response);
    });
})

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
                url: API_URL+'/modules/'+itemID,
                type: 'delete',
                /*beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },*/
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
    table = $('#list').DataTable({
        ajax: {
            url: API_URL+"/modules/full",
            type: "get",
            dataSrc: '',
            /*beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', __token);
            }*/
        },
		columns: [
            {
                data: "link",
                render : function (data, type, row) {
                    return '<a href="'+location.href+'/'+data+'">'+data+'</a>'
                }
            },
			{ data: "text" },
			{ data: "type" },
            {
                data: "parent",
                render : function (data, type, row) {
                    return '<a href="'+location.href+'/'+data+'">'+data+'</a>'
                }
            },
			{ data: "show" },
            { data: "show_nav"},
            {
                data: "content",
                render : function (data, type, row) {
                    return '<div class="row-btns"><a attr-id="'+row.link+'" class="row-btn-edit" href="'+location.href+'/'+row.link+'"><i class="fa fa-pencil"></i></a> <a attr-id="'+row.link+'" class="row-btn-del text-danger" href="#" onclick="javascript:del(\''+row.link+'\'); return false"><i class="fa fa-trash"></i></a></div>'
                }
            }
		],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            console.log(aData);
            /*if (aData.taxiid != null) {
                $(nRow).addClass('taken');
            }*/
        }
	})
})
