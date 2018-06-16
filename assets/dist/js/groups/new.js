var formGen = null;

$(document).ready(function () {
    if (__AUTHED == true) {
        formGen = $('#theform').FormGen('add');
        formGen.initialize();
    }
})
