$(document).ready(function() {
    QRCode.toCanvas(document.getElementById("canvas"), "sample text", function(
        error
    ) {
        if (error) {
            console.error(error);
        }
        console.log("success!");
    });
});
