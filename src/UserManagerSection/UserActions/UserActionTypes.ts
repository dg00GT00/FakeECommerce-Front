import * as React from "react";

export type MessageStateProps = {
    message: string,
    severity: "success" | "warning" | "error" | "info",
    color?: string,
    children?: React.ReactNode
};