$(document).ready(function() {
    // Getting references to our form and input
    const groundOpsForm = $("form.groundops");
    let finishKind = $("select#finish");
    let pipeRange = $("select#range");
    let batchQty = $("input#quantity");
    let location = $("select#location");

    // When the signup button is clicked, we validate the email and password are not blank

    groundOpsForm.on("submit", function(event) {
        console.log("groundOps on submit");
        event.preventDefault();
        let forkliftData = {
            products: {
                range: pipeRange.val().toUpperCase(),
                finish: finishKind.val().toUpperCase(),
                location: location.val().toUpperCase(),
                warehouse: "",
                description: "",
                status: ""
            },
            so: {
                salesOrder: "",
                desription: "",
                material: "",
                orderQty: batchQty.val()
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
            console.log("you forgot to fill out one of the fields");
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
    function sendData(data) {
        console.log("inside sendata function");
        console.log(data);
        $.ajax({
            method: "PUT",
            url: "/api/batches",
            data: data,
            dataType: "json",
            success: function(message) {
                console.log(`${JSON.stringify(message.success)}`);
            },
            error: function(err) {
                console.log(
                    `There was an error with the ajax POST: ${JSON.stringify(
                        err.error
                    )}`
                );
            },
            complete: function() {
                console.log("batches.json successfully updated");
            }
        });
        /*$.post("/api/batches", data)
            .then(function(message) {
                console.log(message);
            })
            .catch(function(err) {
                console.log(err);
            });*/
    }
});
