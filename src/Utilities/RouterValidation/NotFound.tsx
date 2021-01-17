import * as React from "react";

export const NotFound: React.FunctionComponent<{color?: string}> = props => {
    return (
        <h1 style={{color: props.color ?? "white"}}>Nothing here</h1>
    )
}