import * as React from "react";
import {Drawer, List, ListItem} from "@material-ui/core";
import {CartContext} from "../../../../Utilities/Context/CartContext";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";

const drawerStyle = makeStyles({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
    },
    paper: {
        position: "absolute"
    }
});

export const ModalDrawer: React.FunctionComponent<{ open: boolean }> = props => {
    const {getTotalProducts} = React.useContext(CartContext);
    const firstRender = React.useRef(true);
    const [open, setOpen] = React.useState(false);

    const styleDrawer = drawerStyle();

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
                <ListItem>
                    {basket.productName}
                </ListItem>
            );
        })
    );

    return (
        <Drawer open={open}
                className={styleDrawer.root}
                PaperProps={{
                    classes: {
                        root: styleDrawer.paper
                    }
                }}
                onClose={handleClose}
                anchor={"right"}
                variant={"persistent"}>
            <IconButton onClick={handleClose}>
                <CancelRoundedIcon/>
            </IconButton>
            <List>
                {productList}
            </List>
        </Drawer>
    );
}