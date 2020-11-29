import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import styles from "./ProductsSection.module.scss";
import {ProductCard} from "./ProductCard/ProductCard";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";

const useStyles = makeStyles<Theme, { color: string }>({
    root: props => ({
        backgroundColor: props.color
    })
})

export const ProductsSection: React.FunctionComponent = () => {
    const classes = useTheme()
    const style = useStyles({color: classes.palette.primary.main})

    return (
        <>
            <LandingMarketing color={"secondary"}>
                <p>Take a look in our <span className={styles.fakeness}>Fakeness</span></p>
            </LandingMarketing>
            <div className={[style.root, styles.container].join(' ')}>
                <ProductCard/>
            </div>
        </>
    )
}