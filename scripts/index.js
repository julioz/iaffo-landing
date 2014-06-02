$(document).ready(function() {
    function displayTable(id) {
        $('#formTable').hide();
        $('#thank-you').hide();
        $('#uploading').hide();
        
        $(id).show();
    }
    
    displayTable('#formTable');
    
    $('#btSubscribe').on('click', function() {
        ga('send', 'event', 'button', 'click', 'subscribe-click');
    });
    
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
    
    function onDataGatheredComplete() {
        $('#mainText').hide();
        displayTable('#thank-you');
    }
    
    $('#btSubscribe').click(function() {    
        //var name = $('#nameField').val().trim();
        var email = $('#emailField').val().trim();
    
        if ($('#btSubscribe').hasClass('disabled')) {
            $('#incomplete-form-warning').fadeTo(1000,1)
            ga('send', 'event', 'button', 'click', 'btn-subscribe-disabled');
            return;
        }
    
        var Subscribers = Parse.Object.extend("Subscribers");
        var subscriber = new Subscribers();
        
        //subscriber.set("name", name);
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
            var name = userPicture.name;

            var parseFile = new Parse.File(name, userPicture);
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
});