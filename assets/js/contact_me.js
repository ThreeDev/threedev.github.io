$(function() {
    // warm the form handler server
    // $("section#contact").ready(function () {
    //     $.get("https://threedev-web.appspot.com")
    // });
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
            console.log("jqBootstrapValidation.submitError", $form, event, errors);
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            console.log("jqBootstrapValidation.submitSuccess", $form, event);
        }
    });

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            console.log("jqBootstrapValidation.submitError", $form, event, errors);
        },
        submitSuccess: function($form, event) {
            //$('#send').button('loading');
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            console.log("Submitting contact form with ", name, email, phone, message);
            $.ajax({
                url: "https://threedev-web.appspot.com/contact/me",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function( data ) {
                    console.log("Contact form data successfully sent to the server.", data)
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(status, error) {
                    console.log("Failed to submit contact form data to the server.", status, error);
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                },
                complete: function() {
                    //$('#send').button('reset');
                }
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

function recaptchaReady() {
    let button = document.getElementById('send');
    button.removeAttribute('disabled');
}

function recaptchaExpired() {
    let button = document.getElementById('send');
    button.setAttribute('disabled', 'disabled');
}