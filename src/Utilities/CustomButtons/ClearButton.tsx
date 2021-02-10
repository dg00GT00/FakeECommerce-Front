import * as React from "react";
import {ClearFiltersContext} from "../Context/ClearFiltersContext";
import Button from "@material-ui/core/Button/Button";

type ClearButtonProps = {
    className?: string,
    style?: { [i: string]: string | number },
    onClick?: (...args: any[]) => void
}

export const ClearButton: React.FunctionComponent<ClearButtonProps> = props => {
    const {setClear} = React.useContext(ClearFiltersContext);

    const handleClick = (...args: any[]): void => {
        setClear();
        if (props.onClick) {
            props.onClick(args);
        }
    }

    return (
        <Button color={"primary"}
                variant={"contained"}
                onClick={() => handleClick.apply(handleClick, props.onClick?.arguments)}
                {...props}>
            Clear
        </Button>
    );
}