import * as React from "react";
import {ClearFiltersContext} from "./ClearFiltersContext";
import Button from "@material-ui/core/Button/Button";

type ClearButtonProps = {
    className?: string,
    style?: { [i: string]: string | number },
    onClick?: (...args: any[]) => void
}

export const ClearButton: React.FunctionComponent<ClearButtonProps> = props => {
    const {setClear} = React.useContext(ClearFiltersContext);

    const onClick = (...args: any[]): void => {
        console.log("Set clear");
        setClear();
        if (props.onClick) {
            props.onClick(args);
        }
    }

    return (
        <Button color={"primary"}
                variant={"contained"}
                onClick={() => onClick.apply(onClick, props.onClick?.arguments)}
                {...props}>Clear</Button>
    );
}