$(document).ready(function() {
    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function isFileSelected() {
        return document.getElementById("fileselect").value != "";
    }
    
    function displayTable(id) {
        $('#formTable').hide();
        $('#thank-you').hide();
        $('#uploading').hide();
        
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
    
    function saveSubscriberWithPicture(subscriber, parseFile) {
        parseFile.save().then(function() {
                // The file has been saved to Parse.
                subscriber.set("picture", parseFile);
                
                onDataGatheredComplete();
                subscriber.save();
                ga('send', 'event', 'subscription', 'complete', 'subscription-pictureattached');
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                $('#mainText').show();
                displayTable('#formTable');
                alert('Infelizmente um erro ocorreu ao enviar sua imagem. Tente novamente mais tarde.');
        });
    }
    
    $("#progressbar").progressbar({
        value: false // indeterminate
    });
    
    
    $('#uploadbutton').click(function() {
        $('#fileselect').click();
        ga('send', 'event', 'button', 'click', 'upload-click');
    });
    
    function onDataGatheredComplete() {
        $('#mainText').hide();
        displayTable('#thank-you');
    }
    
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
        
        if (isFileSelected()) {
            var name = file.name;

            var parseFile = new Parse.File(name, file);
            displayTable('#uploading');
            saveSubscriberWithPicture(subscriber, parseFile);
        } else {
            onDataGatheredComplete();
            subscriber.save(null, {
                success: function(subscriber) {
                    ga('send', 'event', 'subscription', 'complete', 'subscription-nopicture');
                },
                error: function(subscriber, error) {
                    $('#mainText').show();
                    displayTable('#formTable');
                    alert('Infelizmente um erro ocorreu. Tente novamente mais tarde.');
                }
            });
        }
    });
    
    var file;

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        // Our file var now holds the selected file
        file = files[0];
        $('#uploadbutton').text(file.name);
        $('#btSubscribe').text("CRIAR MINHA CAMISA");
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