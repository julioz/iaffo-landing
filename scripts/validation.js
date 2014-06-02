function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function() {
    $('#btSubscribe').toggleClass('disabled');
    $('#incomplete-form-warning').fadeTo(100,0);

    /*$('#nameField').keyup(function(){
        validateForm();
    });*/

    $('#emailField').keyup(function(){
        validateForm();
    });

    function validateForm() {
        var validName = true;//($('#nameField').val().trim() != '');
        var validMail = validateEmail($('#emailField').val().trim());
        if(validMail && validName){
            $('#btSubscribe').removeClass('disabled');
            $('#incomplete-form-warning').fadeTo(100,0);
        } else {
            $('#btSubscribe').addClass('disabled');
        }
    };
});