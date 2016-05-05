
"use strict";

(function() {

    function chat($window, $sce) {

        return {
            restrict: "E",
            templateUrl: "views/chat.html",
            link: function(scope) {

                // The socket.
                var socket;

                // The Watson Dialog conversation and client identifiers.
                var conversationId;
                var clientId;

                // A reference to the 'a' element that scrolls the conversation down.
                var scroller = $window.document.getElementById("tzsklxyjeurwykbf");

                // A reference user input box.
                var input = $window.document.getElementById("xuafdwulathjbujs");
                input.focus();

                // The conversation lines.
                scope.conversation = [];

                // Execute the given function in a safe way.
                function safeApply(fn) {
                    switch (scope.$root.$$phase) {
                        case "$apply":
                        case "$digest":
                            fn();
                            break;
                        default:
                            scope.$apply(fn);
                            break;
                    }
                }

                // Push a conversation line to the collection.
                function pushConversationLine(speaker, message) {

                    // Add the conversation line -callback, do in a safe way-.
                    safeApply(function() {
                        scope.conversation.push({
                            speaker: speaker,
                            message: $sce.trustAsHtml(message),
                            timestamp: new Date().getTime()
                        });
                    });

                    // Hack: scroll the conversation down.
                    scroller.click();
                }

                // Push a server message to the conversation.
                function serverSay(message) {
                    pushConversationLine("server", message);
                }

                // Push an user message to the conversation.
                function userSay(message) {
                    pushConversationLine("user", message);
                }

                // Create a connection with the server using Socket.IO.
                function openSocket() {

                    // Open the socket.
                    var server = "http://" + $window.location.hostname + ":" + $window.location.port;
                    socket = $window.io.connect(server, { forceNew: true });

                    // Handler for the server messages.
                    socket.on("bot-message", function(data) {

                        // If the message has data.
                        if (data) {

                            // Store the conversation identifier.
                            if (data.conversation_id) {
                                conversationId = data.conversation_id;
                            }

                            // Store the story context.
                            if (data.client_id) {
                                clientId = data.client_id;
                            }

                            // Push the server messages.
                            if (data.response && data.response.length > 0) {
                                serverSay(data.response[0]);
                            }
                        }
                    });
                }

                // Send the user message to the server.
                scope.userMessageBoxKeyUp = function(e) {

                    // In case the user pressed the 'enter' key.
                    if ((e.keyCode || e.which) === 13) {

                        // If the message is not empty.
                        if (input.value) {

                            // Push it to the conversation.
                            userSay(input.value);

                            // Send it to the server.
                            socket.emit("user-message", {
                                input: input.value,
                                conversation_id: conversationId,
                                client_id: clientId
                            });

                            // Clean and focus the box.
                            input.value = "";
                            input.focus();
                        }
                    }
                };

                // Init the conversation.
                openSocket();
            }
        };
    }

    chat.$inject = ["$window", "$sce"];

    angular.module("watson-bot-test").directive("chat", chat);

})();
