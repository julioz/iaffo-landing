function isFileSelected() {
    return document.getElementById("fileselect").value != "";
}

var userPicture;

$(document).ready(function() {
    $("#progressbar").progressbar({
        value: false // indeterminate
    });

    $('#uploadbutton').click(function() {
        $('#fileselect').click();
        ga('send', 'event', 'button', 'click', 'upload-click');
    });

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        // Our file var now holds the selected file
        userPicture = files[0];
        $('#uploadbutton').text(userPicture.name);
        $('#btSubscribe').text("CRIAR MINHA CAMISA");
    });
});