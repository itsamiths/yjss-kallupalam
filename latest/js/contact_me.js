$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
			if($form.attr('id') == "contactForm"){
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
				$.ajax({
					url: 'https://mandrillapp.com/api/1.0/messages/send.json',
					type: "POST",
					data: {
						'key': 'HIeI3k5ZVORq08S8iMYx5w',
						'message': {
						  'from_email': email,
						  'to': [
							  {
								'email': 'yjsskallupalam@gmail.com',
								'type': 'to'
							  }
							],
							'subject': name + ' contacted via YJSS Kallupalam Website Contact Form.',
						  'html': '<p><b>Name:</b> '+name+'</p><p><b>Email:</b> '+email+'</p><p><b>Phone:</b> '+phone+'</p><p><b>Message:</b></p><p>'+message+'</p>'
						}
					},
					cache: false,
					success: function(response) {
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
					error: function() {
						// Fail message
						$('#success').html("<div class='alert alert-danger'>");
						$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
						$('#success > .alert-danger').append('</div>');
						//clear all fields
						$('#contactForm').trigger("reset");
					},
				});
			}
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
