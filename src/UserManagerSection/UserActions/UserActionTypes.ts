import * as React from "react";

export type MessageStateProps = {
    message: string,
    color?: string,
    severity?: "success" | "warning" | "error" | "info",
    children?: React.ReactNode
};