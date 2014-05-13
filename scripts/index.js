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
    
    $('#btSubscribe').click(function() {
        var name = $('#nameField').val().trim();
        var email = $('#emailField').val().trim();
    
        if (!validateEmail(email)) {
            alert('Por favor entre com um email valido.');
        } else if (name == '') {
            alert('Por favor entre com um nome.');
        } else if (validateEmail(email) && name != '') {
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
        } else {
            alert('Por favor preencha todos os campos!');
        }
    });
});