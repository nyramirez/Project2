$(document).ready(function() {
    // Getting references to our form and input
   //const batches = require("../public/batches.json");
   const officeClerkForm = $("form.office");
   let warehouse = $("#warehouse");
   let status = $("#status");
   let description = $("#description");
   let purchaseOrder = $("#purchaseOrder");
   let salesOrder = $("#salesOrder");
   let customerName = $("#customerName");
   let contactNum = $("#contactNum"); 

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    //Display
    $.ajax({
        method: "GET",
        url: "/api/batches"
    })
        .then(function(data) {
            console.log("inside .then function");
            let batches = JSON.parse(data);
            batches.forEach(function(batch) {
                console.log(batch);
                console.log(batch.products);
                let rangeInfo = $("<td>").text(batch.products.range);
                let finishInfo = $("<td>").text(batch.products.finish);
                let locationInfo = $("<td>").text(batch.products.location);
                let qtyInfo = $("<td>").text(batch.so.orderQty);
                let tableRow = $("<tr>").append(rangeInfo, finishInfo, locationInfo, qtyInfo);
                $("#table1").append(tableRow);
            });
        })
       .catch(function(err) {
            console.log(JSON.stringify(err));    
        });



        /*officeClerkForm.on("submit", function(event) {
            event.preventDefault();
            let officeClerkForm = {
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
            };*/

            /*if (
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
        });*/
});

