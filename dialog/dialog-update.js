
// Show a title.
console.log("-------------------------------------------------------");
console.log("WATSON DIALOG UPDATE");

// Get the cli arguments.
const args = process.argv;

// In case of bad request.
if (args.length !== 4) {

    // Show an error message and exit this process.
    console.log("-------------------------------------------------------");
    console.log("You must use this way:");
    console.log("$ node dialog-update.js <dialog-xml-file> <dialog-id>");
    console.log("-------------------------------------------------------");
    process.exit(1);
}

// Otherwise.
else{

    // Requires.
    const config = require("../server/utils").config;
    const fs = require("fs");
    const watson = require("watson-developer-cloud");

    // Create the dialog client.
    var dialog = watson.dialog({
        username: config.watson.dialog.username,
        password: config.watson.dialog.password,
        version: "v1"
    });

    // Create the default params.
    var params = {
        dialog_id: args[3],
        file: fs.createReadStream(args[2])
    };

    // Update the dialog.
    dialog.updateDialog(params, (err, dialog) => {

        // In case of error.
        if (err) {

            // Log it.
            console.log("-------------------------------------------------------");
            console.log("Watson Dialog thrown an error: " + JSON.stringify(err));
            console.log("-------------------------------------------------------");
            process.exit(1);
        }
        // Otherwise.
        else {

            // Show the dialog identifier.
            console.log("-------------------------------------------------------");
            console.log("Dialog updated: " + JSON.stringify(dialog));
            console.log("-------------------------------------------------------");
            process.exit(0);
        }
    });
}
