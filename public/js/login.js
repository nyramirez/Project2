$(document).ready(function() {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    let usernameInput = $("input#name-input");
    let passwordInput = $("input#password-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
        event.preventDefault();
        let userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.username || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        usernameInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
        $.post(
            "/api/login",
            {
                username: username,
                password: password
            },
            function(employee) {
                switch (employee.employeeType) {
                    case "Manager":
                        window.location.replace("/manager");
                        break;
                    case "Clerk":
                        window.location.replace("/clerk");
                        break;
                     case "Forklift":
                        window.location.replace("/forklift");
                        break;
                }
            },
            "json"
        ).catch(function(err) {
            console.log(err);
        });
    }
});
