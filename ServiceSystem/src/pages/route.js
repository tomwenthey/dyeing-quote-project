import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SocketProvider } from "socket.io-react";
import io from "socket.io-client";

import Store from "src/store";
import App from "src/components/App";
import Chat from "src/pages/Chat/Index";

const socket = io.connect("http://localhost:4000");

ReactDOM.render(
  <Provider store={Store}>
    <SocketProvider socket={socket}>
      <App>
        <Chat />
      </App>
    </SocketProvider>
  </Provider>,
  document.getElementById("app")
);

socket.on("msgFromUser", function(from, to, msg) {
  // logic
});
