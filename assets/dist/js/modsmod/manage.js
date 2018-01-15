var splitURL = location.href.split('?')[0].split('/');
var typeURL = splitURL[splitURL.length-1];

if (typeURL == 'mod') $('main>h2').text('Mods');
else $('main>h2').text('Smods');
console.log(API_URL+"/"+typeURL+"s/");

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
                url: API_URL+'/mods/'+itemID+'/',
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

$(document).ready(function () {
    $('#buyList').DataTable({
        ajax: {
            url: API_URL+"/"+typeURL+"s/",
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', __token);
            }
        },
		columns: [
			{ data: "name" },
			{ data: "phone" },
            { data: "email" },
            { data: "address" },
            {
                data: "status",
                render : function (data, type, row) {
                    if (__uType == 'smod') {
                        return '<div class="row-btns"><a attr-id="'+row.id+'" class="row-btn-edit" href="'+location.href+'/'+row.id+'"><i class="fa fa-pencil"></i></a> <a attr-id="'+row.id+'" class="row-btn-del text-danger" href="#" onclick="javascript:del(\''+row.id+'\'); return false"><i class="fa fa-trash"></i></a></div>'
                    } else {
                        return '<div class="row-btns"><a attr-id="'+row.id+'" class="row-btn-edit" href="'+location.href+'/'+row.id+'"><i class="fa fa-eye"></i></a></div>'
                    }
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
