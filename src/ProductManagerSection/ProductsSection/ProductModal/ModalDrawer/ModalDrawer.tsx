import * as React from "react";
import {ListItem, Modal} from "@material-ui/core";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import {CartContext} from "../../../../Utilities/Context/CartContext";
import {makeStyles, Theme} from "@material-ui/core/styles";
import List from "@material-ui/core/List/List";
import IconButton from "@material-ui/core/IconButton";
import styles from "./ModalDrawer.module.scss";
import Button from "@material-ui/core/Button/Button";


const drawerStyle = makeStyles((theme: Theme) => ({
    listRoot: {
        backgroundColor: theme.palette.common.white
    },
    dividerRoot: {
        backgroundColor: theme.palette.primary.main
    }
}));

type ModalDrawerProps = { open: boolean, containerId: string };

export const ModalDrawer: React.FunctionComponent<ModalDrawerProps> = props => {
    const {getTotalProducts, getAmountById, clearItemsById} = React.useContext(CartContext);
    const firstRender = React.useRef(true);
    const [open, setOpen] = React.useState(false);
    const setItems = React.useState<{ [i: number]: number }>({})[1];

    const styleDrawer = drawerStyle();

    const clearBasketItems = (id: number): void => {
        setItems(prevState => {
            const state = prevState && {};
            return {
                ...state,
                [id]: clearItemsById(id)
            };
        });
    }

    React.useEffect(() => {
        if (!firstRender.current) {
            setOpen(true);
        } else {
            firstRender.current = false;
        }
    }, [props.open]);

    const handleClose: React.MouseEventHandler = event => {
        setOpen(false);
    }

    const productList = (
        getTotalProducts().map(basket => {
            return (
                <ListItem key={basket.id}
                          className={styles.item_grid}
                          classes={{root: styleDrawer.listRoot}}>
                    <div className={styles.image}>
                        <img src={basket.pictureUrl} alt={basket.productName}/>
                    </div>
                    <p className={styles.name}>
                        {basket.productName}
                    </p>
                    <p className={styles.price}>
                        {basket.price}
                    </p>
                    <p className={styles.quantity}>
                        <span>qty: </span>{getAmountById(basket.id)}
                    </p>
                    <Button variant={"outlined"} onClick={_ => clearBasketItems(basket.id)}>Clear Items</Button>
                </ListItem>
            );
        })
    );

    return (
        <Modal open={open}
               disableAutoFocus
               disableBackdropClick
               onClose={handleClose}
               BackdropProps={{
                   style: {
                       position: "initial",
                       width: "100%"
                   }
               }}
               style={{
                   position: "absolute",
                   display: "flex"
               }}
               container={document.getElementById(props.containerId)}>
            <div className={[styleDrawer.listRoot, styles.modal_container].join(" ")}>
                <IconButton onClick={handleClose} className={styles.close_button}>
                    <CancelRoundedIcon/>
                </IconButton>
                <div className={[styles.divider, styleDrawer.dividerRoot].join(" ")}/>
                <List className={styleDrawer.listRoot}>
                    {productList}
                </List>
            </div>
        </Modal>
    );
}