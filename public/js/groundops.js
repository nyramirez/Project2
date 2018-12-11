$(document).ready(function() {
    // Getting references to our form and input
    const groundOpsForm = $("form.groundops");
    const materialClass = $("select#material");
    const finishKind = $("select#finish");
    const pipeRange = $("select#range");
    const batchQty = $("input#quantity");
    const location = $("select#location")

    // When the signup button is clicked, we validate the email and password are not blank

    signUpForm.on("submit", function(event) {
        event.preventDefault();
        let userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim(),
            employeeType: employeeType.val().trim()
        };

        if (
            !userData.username ||
            !userData.password ||
            !userData.employeeType
        ) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.username, userData.password, userData.employeeType);
        usernameInput.val("");
        passwordInput.val("");
        employeeType.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, password, employeeType) {
        $.post("/api/signup", {
            username: username,
            password: password,
            employeeType: employeeType
        })
            .then(function() {
                window.location.replace("/success");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
    });
