$(document).ready(function() {
    // Getting references to our form and input
    const officeClerkForm = $("form.office");
    const warehouse = $("#warehouse");
    const status = $("#status");
    const description = $("#description");
    const purchaseOrder = $("#purchaseOrder");
    const salesOrder = $("#salesOrder");
    const customerName = $("#customerName");
    const contactNum = $("#contactNum");

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    officeClerkForm.on("submit", function(event) {
        event.preventDefault();
        let officeClerkData = {
            warehouse: warehouseInput.val(),
            status: statusInput.val(),
            description: description.val(),
            purchaseOrder: purchaseOrder.val(),
            salesOrder: salesOrder.val(),
            customerName: customerName.val(),
            contactNum: contactNum.val()
        };

        postOffice(
            officeClerkData.warehouse,
            officeClerkData.status,
            officeClerkData.description,
            officeClerkData.purchaseOrder,
            officeClerkData.salesOrder,
            officeClerkData.customerName,
            officeClerkData.contactNum
        );
        warehouseInput.val("");
        statusInput.val("");
        descriptionInput.val("");
        purchaseOrderInput.val("");
        salesOrderInput.val("");
        customerNameInput.val("");
        contactNumInput.val("");
    });

    //post clerk data
    function postOffice(
        warehouse,
        status,
        description,
        purchaseOrder,
        salesOrder,
        customerName,
        contactNum
    ) {
        $.post("/api/office", {
            warehouse: warehouse,
            status: status,
            description: description,
            purchaseOrder: purchaseOrder,
            salesOrder: salesOrder,
            customerName: customerName,
            contactNum: contactNum
        })
            .then(function() {
                //Successful reponse redirect
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
