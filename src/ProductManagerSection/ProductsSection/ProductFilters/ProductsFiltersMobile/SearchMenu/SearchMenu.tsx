import * as React from "react";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import {InputBase, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import styles from "./Search.module.scss";
import {useSearch} from "../../../../../Utilities/CustomHooks/useSearch";

const searchBarStyle = makeStyles({
    root: {
        backgroundColor: "#ffd36954", // Change this value if the secondary theme color also change
    }
});

export const SearchMenu: React.FunctionComponent = () => {
    const searchStyle = searchBarStyle();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const setInputResult = useSearch(inputRef);

    return (
        <Paper className={[styles.product_search, searchStyle.root].join(" ")}>
            <IconButton aria-label={"search"}>
                <SearchRoundedIcon className={styles.search_icon}/>
            </IconButton>
            <InputBase
                onChange={event => setInputResult(event.target.value)}
                placeholder={"Search"}
                fullWidth
                className={styles.input_search_bar}
                inputRef={inputRef}/>
        </Paper>
    );
}