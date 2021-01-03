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
import {ReactComponent as CartArrowDown} from "../../../Assets/cartArrowDown.svg";
import {ButtonBase, useTheme} from "@material-ui/core";
import {CartContext} from "../../../Utilities/Context/CartContext";
import {ProductCardProps} from '../../../Utilities/ProductProps/ProductCardProps';
import {useHistory} from "react-router-dom";


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
    outerContainer?: { [i: string]: string, backgroundColor: string },
    innerContainer?: { [i: string]: string, backgroundColor: string },
};

type CardHighlightType = {
    backgroundColor?: string,
    fill?: string,
    color?: string,
};

export const ProductCard: React.FunctionComponent<ProductCardProps> = props => {
    const cartContext = React.useContext(CartContext);
    let [isProductSelected, selectProduct] = React.useState(false);
    const [productHighlighted, setProductHighlight] = React.useState<HighlightProductType | undefined>();
    const [cardHighlighted, setCardHighlight] = React.useState<CardHighlightType | undefined>();

    const theme = useTheme();
    const {push} = useHistory();
    const cardHeaderStyle = useStyles();

    const primaryColor = theme.palette.primary.main;
    const secondaryLight = theme.palette.secondary.light;
    const white = theme.palette.common.white;

    const productHighlightedStyle: HighlightProductType = {
        outerContainer: {
            borderRadius: "4px",
            backgroundColor: secondaryLight,
        },
        innerContainer: {
            transform: "scale(.988)",
            borderRadius: "inherit",
            backgroundColor: "#e0c178",
        },
    }

    const cardHighlightedStyle: CardHighlightType = {
        backgroundColor: primaryColor,
        fill: white,
        color: white,
    }

    const productSelectionManager = (): void => {
        if (isProductSelected) {
            setProductHighlight(productHighlightedStyle);
            setCardHighlight(cardHighlightedStyle);
            cartContext.increaseAmount({quantity: 1, ...props});
        } else {
            setProductHighlight({});
            setCardHighlight({});
            cartContext.decreaseAmount({quantity: 1, ...props});
        }
    }

    const toggleProductSelection = (): void => {
        selectProduct(prevState => {
            isProductSelected = !prevState
            productSelectionManager();
            return isProductSelected;
        });
    }

    const seeProductDetail = (event: React.MouseEvent, id: number): void => {
        console.log(id);
        push({
            pathname: "/products",
            search: new URLSearchParams({id: id.toString()}).toString()
        });
    }

    return (
        <div style={productHighlighted?.outerContainer}>
            <div style={productHighlighted?.innerContainer}>
                <Card className={styles.card}>
                    <CardHeader title={props.productName}
                                className={[cardHeaderStyle.root, styles.card_title].join(" ")}
                                style={cardHighlighted}
                                action={
                                    <ShareRounded/>
                                } disableTypography>
                    </CardHeader>
                    <CardActionArea className={styles.card_action_area}
                                    onClick={event => seeProductDetail(event, props.id)}>
                        <CardMedia className={styles.media} image={props.pictureUrl}/>
                        <CardContent className={styles.card_content}>
                            <p>
                                {props.description}
                            </p>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={styles.card_actions} style={cardHighlighted}>
                        <div className={styles.price}>{`$ ${props.price}`}</div>
                        <ButtonBase className={styles.cart_arrow_down_button} onClick={toggleProductSelection}>
                            <CartArrowDown className={styles.cart_arrow_down} style={cardHighlighted}/>
                        </ButtonBase>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
