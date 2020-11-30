import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ShareRounded from '@material-ui/icons/ShareRounded';
import CardHeader from "@material-ui/core/CardHeader";
import styles from "./ProductCard.module.scss";
import {ReactComponent as CartArrowDown} from "../../Assets/cartArrowDown.svg";
import {ButtonBase, useTheme} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        justifyContent: "space-between",
        "& div:first-child": {
            flex: 1
        },
        "& div:last-child": {
            margin: 0
        }
    }
});

type HighlightProductType = {
    outerContainer?: { [i: string]: string }
    innerContainer?: { [i: string]: string }
}

export const ProductCard: React.FunctionComponent = () => {
    const [highlighted, setHighlight] = React.useState<HighlightProductType>({})
    const theme = useTheme();

    let productHighlighted: HighlightProductType = {
        outerContainer: {
            borderRadius: "4px",
            backgroundColor: theme.palette.secondary.light
        },
        innerContainer: {
            transform: "scale(.988)",
            borderRadius: "inherit",
            backgroundColor: "#e0c178"
        }
    }

    const cardHeaderStyle = useStyles();

    const selectProduct = () => {
        setHighlight(prevHighlight => {
            if (Object.keys(prevHighlight).length !== 0) {
                productHighlighted = {}
            }
            return productHighlighted
        })
    }

    return (
        <div style={highlighted.outerContainer}>
            <div style={highlighted.innerContainer}>
                <Card className={styles.card}>
                    <CardActionArea className={styles.card_action_area}>
                        <CardHeader title={"Product Title"}
                                    className={[cardHeaderStyle.root, styles.card_title].join(" ")}
                                    action={
                                        <ShareRounded/>
                                    } disableTypography>
                        </CardHeader>
                        <CardMedia className={styles.media} title="Placeholder"/>
                        <CardContent>
                            <p>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </p>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={styles.card_actions}>
                        <div className={styles.price}>$ 100.00</div>
                        <ButtonBase className={styles.cart_arrow_down_button} onClick={selectProduct}>
                            <CartArrowDown className={styles.cart_arrow_down}/>
                        </ButtonBase>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
