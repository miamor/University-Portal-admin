var formGen = null;

$(document).ready(function () {
    if (__AUTHED == true) {
        formGen = $('#theform').FormGen('edit');
        formGen.initialize();
    }
})
