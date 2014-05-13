$(document).ready(function() {    
    
    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function displayTable(id) {
        $('#formTable').hide();
        $('#thank-you').hide();
        
        $(id).show();
    }
    
    displayTable('#formTable');
    
    $('#btSubscribe').attr('disabled',true);
    
    $('#nameField').keyup(function(){
        validateForm();
    });
    
    $('#emailField').keyup(function(){
        validateForm();
    });
    
    function validateForm() {
        var validName = ($('#nameField').val().trim() != '');
        var validMail = validateEmail($('#emailField').val().trim());
        if(validMail && validName){
            $('#btSubscribe').attr('disabled', false);
        } else {
            $('#btSubscribe').attr('disabled',true);
        }
    };
    
    $('#btSubscribe').click(function() {    
        var name = $('#nameField').val().trim();
        var email = $('#emailField').val().trim();
    
        var Subscribers = Parse.Object.extend("Subscribers");
        var subscriber = new Subscribers();
        
        subscriber.set("name", name);
        subscriber.set("email", email);
     
        subscriber.save(null, {
            success: function(subscriber) {
                displayTable('#thank-you');
            },
            error: function(subscriber, error) {
                alert('Infelizmente um erro ocorreu. Tente mais tarde.');
            }
        });
    });
});