import * as React from "react";
import {CSSProperties} from "react";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Button, {ButtonProps} from "@material-ui/core/Button/Button";
import {useMediaQuery} from "@material-ui/core";
import {GeneralMediaQueries} from "../Theme/GeneralMediaQueries";

type LoadProgressButtonProps = ButtonProps & {
    isLoading: boolean;
    loadingStyle?: CSSProperties;
};

export const LoadProgressButton: React.FunctionComponent<LoadProgressButtonProps> = props => {
    const {isLoading, children, ...buttonProps} = props;
    const mediaQuery = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET})`);

    let styleCircular: CSSProperties = {
        width: mediaQuery ? "14%" : "20%",
        height: mediaQuery ? "14%" : "20%"
    };

    styleCircular = props.loadingStyle ?? styleCircular;

    return (
        <Button {...buttonProps}>
            {isLoading ? <CircularProgress style={styleCircular}/> : children}
        </Button>
    );
}