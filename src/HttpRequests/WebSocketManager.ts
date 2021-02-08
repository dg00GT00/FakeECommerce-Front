export class WebSocketManager {
    public socket?: WebSocket;

    public connect<T>(delegate: (data: T) => void): void {
        console.log("The socket readyState: ", this.socket?.readyState);
        console.log("The current socket: ", this.socket);
        if (this.socket?.readyState === WebSocket.CLOSED) {
            this.socket = undefined;
        }
        if (!this.socket) {
            this.socket = new WebSocket("wss://localhost:5001/getpaymentprocessing");
        }
        this.socket.onmessage = (event: MessageEvent<T>) => {
            delegate(event.data);
        }
        this.socket.onclose = (event: CloseEvent) => {
            console.log("Inside the close event");
            console.log("The close event was cleared: ", event.wasClean, event.code, event.reason);
        }
        console.log("Inside the websocket connect: ", this.socket.onmessage, this.socket);
    }

    public disconnect(code?: number, reason?: string): void {
        this.socket?.close(code, reason);
        this.socket = undefined;
    }
}