export const socketMiddleware = (wsStaticActions) => {
  return (store) => {
    let socket = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";
    let { onOpen, onError, wsConnecting, onClose } = [];

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload, wsActions } = action;
      const { wsConnect, wsDisconnect, onMessage } = wsStaticActions;

      if (wsActions) {
        ({ onOpen, onError, wsConnecting, onClose } = wsActions);
      }

      if (type === wsConnect && !isConnected) {
        url = payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          console.log("socket.onerror", event);
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log("socket.onclose", event);
            dispatch({ type: onError, payload: event.code.toString() });
          }

          dispatch({ type: onClose, payload: event.code.toString() });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        if (type === wsDisconnect && isConnected) {
          isConnected = false;
          clearTimeout(reconnectTimer);
          reconnectTimer = 0;

          socket.close(1000, "Работа приложения закончена");
        }
      }

      next(action);
    };
  };
};
