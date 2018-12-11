$(document).ready(function() {
    // Getting references to our form and input
    const groundOpsForm = $("form.groundops");
    const finishKind = $("select#finish");
    const pipeRange = $("select#range");
    const batchQty = $("input#quantity");
    const location = $("select#location");

    // When the signup button is clicked, we validate the email and password are not blank

    groundOpsForm.on("submit", function(event) {
        event.preventDefault();
        let forkliftData = {
            products: {
                range: pipeRange,
                finish: finishKind,
                location: location,
                warehouse: "",
                description: "",
                status: ""
            },
            so: {
                salesOrder: "",
                desription: "",
                material: "",
                orderQty: batchQty
            },
            po: {
                purchaseOrder: "",
                contact: "",
                customer: ""
            }
        };

        if (
            !forkliftData.products.range ||
            !forkliftData.products.finish ||
            !forkliftData.products.location ||
            !forkliftData.so.orderQty
        ) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        sendData(forkliftData);
        groundOpsForm.val("");
        finishKind.val("");
        pipeRange.val("");
        batchQty.val("");
        location.val("");
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
