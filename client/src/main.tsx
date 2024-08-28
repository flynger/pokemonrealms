import "../../shared/prototype/globals";

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import socket from './socket/socket.ts';

socket.emit("message", "hi");

ReactDOM.createRoot(document.getElementById('root')!).render(
    //<React.StrictMode>
    <App />
    //</React.StrictMode>,
)
