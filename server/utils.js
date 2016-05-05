
// Requires.
const colour = require("colour");
const dateFormat = require("dateformat");
const fs = require("fs");
const path = require("path");

// Read and parse the config file.
// WARNING: we assume there is no error in the config file reading. This is just an example of Watson Dialog
// integration, so the properly error handling in this operation is not the main focus right now.
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json")));

// Export the Utils module.
module.exports = {

    // Print the given message in the console.
    "print": (msg) => {
        console.log(dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss").cyan + " > ".red + msg.green);
    },

    // Read the config file, parse it and return it.
    "config": config
};
