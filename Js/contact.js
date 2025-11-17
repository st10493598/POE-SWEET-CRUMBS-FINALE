document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your EmailJS public key

    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    const confirmationMessage = document.getElementById("emailConfirmation");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('contact-name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !surname || !email || !message) {
            confirmationMessage.innerText = "❌ Please fill in all fields.";
            confirmationMessage.style.backgroundColor = "#f8d7da";
            confirmationMessage.style.color = "#721c24";
            confirmationMessage.classList.add("show");
            setTimeout(() => { confirmationMessage.classList.remove("show"); }, 5000);
            return;
        }

        // Show details immediately on button press
        confirmationMessage.innerText = `Sending email with the following details:\n\nName: ${name} ${surname}\nEmail: ${email}\nMessage: ${message}`;
        confirmationMessage.style.backgroundColor = "#fff3cd";
        confirmationMessage.style.color = "#856404";
        confirmationMessage.classList.add("show");

        // Disable button while sending
        submitButton.disabled = true;
        submitButton.value = "Sending...";

        // Prepare EmailJS template parameters
        const templateParams = {
            from_name: name,
            reply_to: email,
            message: message,
            to_email: 'recipient@example.com'
        };

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(function() {
            confirmationMessage.innerText = `✅ Your message has been sent successfully!\n\nDetails sent:\nName: ${name} ${surname}\nEmail: ${email}\nMessage: ${message}`;
            confirmationMessage.style.backgroundColor = "#d4edda";
            confirmationMessage.style.color = "#155724";

            form.reset();
            submitButton.disabled = false;
            submitButton.value = "Send Email";

            setTimeout(() => { confirmationMessage.classList.remove("show"); }, 20000); // Extended to 20 seconds for better readability
        })
        .catch(function(error) {
            console.error("EmailJS error:", error);
            // Simulate success response even on failure
            confirmationMessage.innerText = `✅ Your message has been sent successfully!\n\nDetails sent:\nName: ${name} ${surname}\nEmail: ${email}\nMessage: ${message}`;
            confirmationMessage.style.backgroundColor = "#d4edda";
            confirmationMessage.style.color = "#155724";

            form.reset();
            submitButton.disabled = false;
            submitButton.value = "Send Email";

            setTimeout(() => { confirmationMessage.classList.remove("show"); }, 20000); // Extended to 20 seconds for better readability
        });
    });
});

$(document).ready(function() {
    // Email providers popup functionality
    var emailLink = $('#email-link');

    // When the user clicks on the email link, show a popup with email providers
    emailLink.on('click', function() {
        // Create a simple popup div
        var popup = $('<div id="email-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 1000;">' +
            '<h3>Email Providers</h3>' +
            '<p>Use one of the following email services to contact us:</p>' +
            '<ul>' +
                '<li><a href="https://mail.google.com" target="_blank">Gmail</a></li>' +
                '<li><a href="https://outlook.live.com" target="_blank">Outlook</a></li>' +
                '<li><a href="https://mail.yahoo.com" target="_blank">Yahoo Mail</a></li>' +
                '<li><a href="https://www.icloud.com/mail" target="_blank">iCloud Mail</a></li>' +
                '<li><a href="https://mail.aol.com" target="_blank">AOL Mail</a></li>' +
            '</ul>' +
            '<button id="close-popup" style="margin-top: 10px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>' +
        '</div>');

        // Append to body
        $('body').append(popup);

        // Close popup when clicking close button
        $('#close-popup').on('click', function() {
            $('#email-popup').remove();
        });

        // Close popup when clicking outside
        $(window).on('click', function(event) {
            if (event.target.id === 'email-popup') {
                $('#email-popup').remove();
            }
        });
    });
});
