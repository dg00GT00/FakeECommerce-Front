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
import {ButtonBase, Theme} from "@material-ui/core";
import {CartContext} from "../../../Utilities/Context/CartContext";
import {ProductCardProps} from '../../../Utilities/ProductProps/ProductCardProps';
import {useHistory} from "react-router-dom";


const useStyle = makeStyles({
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

const useCardHighlightStyle = makeStyles((theme: Theme) => ({
    outerContainer: {
        borderRadius: "4px",
        backgroundColor: theme.palette.secondary.light
    },
    innerContainer: {
        transform: "scale(.988)",
        borderRadius: "inherit",
        backgroundColor: "#e0c178"
    },
    innerCard: {
        backgroundColor: theme.palette.primary.main,
        fill: theme.palette.common.white,
        color: theme.palette.common.white
    }
}));

type CardHighlightState = Partial<ReturnType<typeof useCardHighlightStyle> & {
    isCardSelected: boolean,
    firstRender: { [i: number]: boolean }
}>;

type CardDispatchActions =
    | { type: "SELECT_CARD", productId: number, selectedState: CardHighlightState }
    | { type: "UNSELECT_CARD", productId: number }
    | { type: "PREVIOUS_STATE" }

type CardHighlightReducer = React.Reducer<CardHighlightState, CardDispatchActions>;

const cardReducer = (prevState: CardHighlightState, actions: CardDispatchActions): CardHighlightState => {
    switch (actions.type) {
        case "SELECT_CARD":
            return {
                ...actions.selectedState,
                isCardSelected: true,
                firstRender: {
                    [actions.productId]: true
                }
            };
        case "UNSELECT_CARD":
            return {
                ...prevState,
                outerContainer: undefined,
                innerContainer: undefined,
                innerCard: undefined,
                isCardSelected: false,
                firstRender: {
                    [actions.productId]: false
                }
            };
        default:
            return prevState;
    }
}

export const ProductCard: React.FunctionComponent<ProductCardProps> = props => {
    const cartContext = React.useContext(CartContext);
    const cardStyle = useCardHighlightStyle();
    const [cardState, dispatchCardState] = React.useReducer<CardHighlightReducer>(cardReducer, {});
    const {push} = useHistory();
    const cardHeaderStyle = useStyle();

    const toggleProductSelection = (): void => {
        if (cartContext.getAmountById(props.id) > 1) return;
        if (cardState.isCardSelected) {
            dispatchCardState({type: "UNSELECT_CARD", productId: props.id});
            cartContext.decreaseAmount({quantity: 1, ...props});
        } else {
            dispatchCardState({type: "SELECT_CARD", productId: props.id, selectedState: cardStyle});
            cartContext.increaseAmount({quantity: 1, ...props});
        }
    }

    const seeProductDetail = (event: React.MouseEvent, id: number): void => {
        push({
            pathname: "/products",
            search: new URLSearchParams({id: id.toString()}).toString()
        });
    }

    // Sets the product highlighting state at the first render if any product amount is found
    React.useEffect(() => {
        if (cartContext.getAmountById(props.id)) {
            dispatchCardState({type: "SELECT_CARD", productId: props.id, selectedState: cardStyle});
        } else {
            dispatchCardState({type: "UNSELECT_CARD", productId: props.id});
        }
    }, [props.id, cardStyle, cartContext]);

    return (
        <div className={cardState.outerContainer}>
            <div className={cardState.innerContainer}>
                <Card className={styles.card}>
                    <CardHeader title={props.productName}
                                className={[cardState.innerCard, cardHeaderStyle.root, styles.card_title].join(" ")}
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
                    <CardActions className={[cardState.innerCard, styles.card_actions].join(" ")}>
                        <div className={styles.price}>{`$ ${props.price}`}</div>
                        <ButtonBase className={styles.cart_arrow_down_button} onClick={toggleProductSelection}>
                            <CartArrowDown className={[cardState.innerCard, styles.cart_arrow_down].join(" ")}/>
                        </ButtonBase>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}
