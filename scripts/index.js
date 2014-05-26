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
    
    $('#shareDiv').share({
        networks: ['facebook','twitter','googleplus','linkedin','tumblr','pinterest','email'],
        urlToShare: 'http://www.iaffo.com',
    });
    
    displayTable('#formTable');
    
    $('#btSubscribe').attr('disabled',true);
    
    $('#btSubscribe').on('click', function() {
        ga('send', 'event', 'button', 'click', 'subscribe-click');
    });
    
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
        subscriber.set("emailSent", false);
        
        if (isMobile.Android()) {
            subscriber.set("device", "android");
        } else if(isMobile.iOS()) {
            subscriber.set("device", "iOS");
        } else {
            subscriber.set("device", "desktop");
        }
     
        subscriber.save(null, {
            success: function(subscriber) {
            $('#mainText').hide();
                displayTable('#thank-you');
            },
            error: function(subscriber, error) {
                alert('Infelizmente um erro ocorreu. Tente mais tarde.');
            }
        });
    });    
    
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }

    };
    
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
});