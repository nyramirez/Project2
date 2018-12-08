$(document).ready(function() {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
    const employeeType = $("#dropdown-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
        event.preventDefault();
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            employeeType: employeeType.val().trim()
        };

        if (!userData.email || !userData.password || !userData.employeeType) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password, userData.employeeType);
        emailInput.val("");
        passwordInput.val("");
        employeeType.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, employeeType) {
        $.post("/api/signup", {
            email: email,
            password: password,
            employeeType: employeeType
        })
            .then(function(data) {
                window.location.replace(data);
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
