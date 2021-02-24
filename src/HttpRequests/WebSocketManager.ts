export class WebSocketManager {
    private _socket?: WebSocket;
    private _webSocketUrl = process.env.NODE_ENV === "production" ?
        `wss://${window.location.host}:443/getpaymentprocessing` : "wss://localhost:5001/getpaymentprocessing";

    /**
     * Create an singleton websocket instance and assign it correspondent events.
     * In case of error or close event, the websocket instance is destroyed and recreate on
     * next connection call
     * @param delegate a function that will be run at each message received from the server
     */
    public connect<T>(delegate: (data: T) => void): void {
        if (!this._socket) {
            this._socket = new WebSocket(this._webSocketUrl);
            this._socket.onmessage = (event: MessageEvent<T>) => {
                delegate(event.data);
            };
            this._socket.onerror = (event) => {
                this._socket = undefined;
            };
            this._socket.onclose = (event: CloseEvent) => {
                this._socket = undefined;
            };
        }
    }

    /**
     * Disconnect from the WebSocket server and removes it respective client instance
     * @param code an optional code the WebSocket code to send to the server
     * @param reason an optional reason to sent to the WebSocket server
     */
    public disconnect(code?: number, reason?: string): void {
        this._socket?.close(code, reason);
        this._socket = undefined;
    }
}