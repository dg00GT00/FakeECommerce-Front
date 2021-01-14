import * as React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import styles from "./ShippingOptions.module.scss";


const initialCheckState = {
    UPS1: false,
    UPS2: false,
    UPS3: false,
    UPS4: false,
};

export const ShippingOptions: React.FunctionComponent = () => {
    const [check, setCheckValue] = React.useState(initialCheckState);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setCheckValue((_) => {
            return {
                ...initialCheckState,
                [event.target.name]: event.target.checked,
            };
        });
    };

    return (
        <FormControl className={styles.form_control} required>
            <div className={styles.shipping_option}><FormControlLabel
                control={
                    <Checkbox
                        color={"primary"}
                        checked={check.UPS1}
                        onChange={handleChange}
                        name={"UPS1"}
                    />
                }
                label="UPS1"
            />
                <p>Fastest Delivery Time</p>
                <p>1 - 2 Days</p>
                <h3>$ 10.00</h3>
            </div>
            <div className={styles.shipping_option}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color={"primary"}
                            checked={check.UPS2}
                            onChange={handleChange}
                            name={"UPS2"}
                        />
                    }
                    label="UPS2"
                />
                <p>Get it within 5 days</p>
                <p>2 - 5 days</p>
                <h3>$ 10.00</h3>
            </div>
            <div className={styles.shipping_option}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color={"primary"}
                            checked={check.UPS3}
                            onChange={handleChange}
                            name={"UPS3"}
                        />
                    }
                    label="UPS3"
                />
                <p>Slower but cheap</p>
                <p>5 - 10 days</p>
                <h3>$ 10.00</h3>
            </div>
            <div className={styles.shipping_option}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color={"primary"}
                            checked={check.UPS4}
                            onChange={handleChange}
                            name={"UPS4"}
                        />
                    }
                    label="UPS4"
                />
                <p>You get what you pay for</p>
                <p>1 - 2 Years</p>
                <h3>FREE</h3>
            </div>
        </FormControl>
    );
};
