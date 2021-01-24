import * as React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import styles from "./ShippingOptions.module.scss";
import {makeStyles} from "@material-ui/core";
import {OrderModel} from "../../Utilities/OrderModel/OrderModel";
import {OrderError, OrdersRequestsManager,} from "../../HttpRequests/OrdersRequestsManager";
import {useHistory} from "react-router-dom";
import {CheckoutRoute} from "../../Utilities/CustomHooks/CheckoutRoute/CheckoutRoute";
import {CartContext} from "../../Utilities/Context/CartContext";
import Button from "@material-ui/core/Button/Button";

const formGridStyle = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr 50% 1fr auto",
        gridAutoRows: 60,
        alignItems: "center",
        margin: "40px 0",
    },
});

type CheckFormsType = Record<"UPS1" | "UPS2" | "UPS3" | "FREE", boolean>;

const initialCheckState: CheckFormsType = {
    UPS1: false,
    UPS2: false,
    UPS3: false,
    FREE: false,
};

const orders = new OrdersRequestsManager();

export const ShippingOptions: React.FunctionComponent = () => {
    const {push} = useHistory();
    const {setShippingValue} = React.useContext(CartContext);

    const [check, setCheckValue] = React.useState(initialCheckState);
    const [shippingOptions, setShippingOption] = React.useState<OrderModel[]>([]);

    const styleFormGrid = formGridStyle();

    React.useEffect(() => {
        orders
            .getShippingOptions()
            .then(response => {
                setShippingOption(response);
            })
            .catch((error: OrderError) => {
                if (error.statusCode === "401") {
                    push({
                        pathname: "/user/login",
                        state: CheckoutRoute.TO_LOGIN,
                    });
                }
            });
    }, [push]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        setCheckValue(_ => {
            return {
                ...initialCheckState,
                [event.target.name]: event.target.checked,
            };
        });
    };

    const enterShippingValue: React.MouseEventHandler = event => {
        for (const key in check) {
            if (check.hasOwnProperty(key) && check[key as keyof CheckFormsType]) {
                for (const option of shippingOptions) {
                    if (option.shortName === key) {
                        setShippingValue(option.price);
                        break;
                    }
                }
            }
        }
        push({
            pathname: "/user/address/update",
            state: CheckoutRoute.TO_ADDRESS_UPDATE
        });
    };

    const goBack: React.MouseEventHandler = event => {
        setShippingValue(null);
        push("/");
    };

    return (
        <>
            <FormControl className={styleFormGrid.root} required>
                {shippingOptions
                    .map(option => {
                        return (
                            <React.Fragment key={option.shortName}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color={"primary"}
                                            checked={check[option.shortName as keyof CheckFormsType]}
                                            onChange={handleChange}
                                            name={option.shortName}
                                        />
                                    }
                                    label={option.shortName}
                                />
                                <p>{option.description}</p>
                                <p>{option.deliveryTime}</p>
                                <h3 className={styles.price}>$ {option.price}</h3>
                            </React.Fragment>
                        );
                    })
                    .reverse()}
            </FormControl>
            <div className={styles.nav_buttons}>
                <Button variant={"contained"} onClick={goBack}>
                    Go Back
                </Button>
                <Button
                    disabled={!Object.values(check).some(option => option)}
                    onClick={enterShippingValue}
                    variant={"contained"}
                    color={"secondary"}
                >
                    Confirm
                </Button>
            </div>
        </>
    );
};
