
// Requires.
const _ = require("lodash");
const watson = require("watson-developer-cloud");

// The Watson Dialog bot.
function Bot(username, password, dialogId) {

    var self = this;

    // Create the dialog client.
    var dialog = watson.dialog({
        username: username,
        password: password,
        version: "v1"
    });

    // The conversation default params.
    var defaultParams = { dialog_id: dialogId };

    // Do a conversation request to the dialog client.
    self.query = (params, cb) => {

        // Merge the default params with the current ones.
        _.merge(params, defaultParams);

        // Do the conversation request.
        dialog.conversation(params, (err, conversation) => {

            // In case of error.
            if (err) { cb(err); }

            // Otherwise
            else { cb(undefined, conversation); }
        });
    };
}

// Export the Watson Dialog bot.
module.exports = (username, password, dialogId) => { return new Bot(username, password, dialogId); };
