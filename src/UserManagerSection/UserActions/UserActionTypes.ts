export type MessageStateProps = {
    message: string,
    messageStateCount: 0 | 1,
    color?: string,
    severity?: "success" | "warning" | "error" | "info",
}