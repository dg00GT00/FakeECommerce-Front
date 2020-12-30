export type MessageState = {
    message: string | undefined,
    stateCount: number,
    color?: string,
    severity?: "success" | "warning" | "error" | "info",
}