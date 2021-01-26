import Button, {ButtonProps} from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import * as React from "react";
import {CSSProperties} from "react";

type LoadProgressButtonProps = ButtonProps & {
    isLoading: boolean;
};

export const LoadProgressButton: React.FunctionComponent<LoadProgressButtonProps> = props => {
    const {isLoading, children, ...buttonProps} = props;
    const styleCircular: CSSProperties = {
        width: "20%",
        height: "20%"
    };

    return (
        <Button {...buttonProps}>
            {isLoading ? <CircularProgress style={styleCircular}/> : children}
        </Button>
    );
}