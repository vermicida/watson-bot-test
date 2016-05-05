
// Requires.
const bot = require("./bot");
const config = require("./utils").config;
const express = require("express");
const http = require("http");
const path = require("path");
const print = require("./utils").print;
const socketio = require("socket.io");

// Create the Express application and the Socket.IO server.
const app = express();
const server = http.Server(app);
const io = socketio(server);

// Set the webapp directory as static.
app.use(express.static("public"));

// When a client connects.
io.on("connection", function(socket) {

    // Log a message to confirm the connection.
    print("client connected");

    // Create a new bot.
    const client = bot(
        config.watson.dialog.username,
        config.watson.dialog.password,
        config.watson.dialog.dialogId
    );

    // Do a first empty query to get the greetings from the bot.
    client.query({ input: "" }, (err, conversation) => {

        // In case of error.
        if (err) {
            print(JSON.stringify(error));
            process.exit(1);
        }
        // Otherwise.
        else {

            // Log the bot conversation, and then notify it to the client.
            print("bot says: " + JSON.stringify(conversation));
            socket.emit("bot-message", conversation);

            // Handle the client incoming messages.
            socket.on("user-message", function(data) {

                // Log the message data.
                print("received: " + JSON.stringify(data));

                // Ask the bot.
                client.query(data, (err, conversation) => {

                    // In case of error.
                    if (err) { print(JSON.stringify(error)); }

                    // Otherwise.
                    else {
                        // Log the bot conversation, and then notify it to the client.
                        print("bot says: " + JSON.stringify(conversation));
                        socket.emit("bot-message", conversation);
                    }
                });
            });
        }
    });
});

// Run the server.
server.listen(
    config.server.port,
    config.server.host,
    () => {
        print("server running at http://" + config.server.host + ":" + config.server.port);
    }
);
