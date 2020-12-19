import * as React from "react";
import styles from "./UserAddress.module.scss";
import {UserCountry} from "../UserAddressFields/UserCountry";
import {UserState} from "../UserAddressFields/UserState";
import {UserZipCode} from "../UserAddressFields/UserZipCode";
import {UserCity} from "../UserAddressFields/UserCity";
import {UserStreet} from "../UserAddressFields/UserStreet";
import {UserAddressComplement} from "../UserAddressFields/UserAddressComplement";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";


export const UserAddress: React.FunctionComponent<UserInputTypes> = props => {
    const [country, setCountry] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCountry(value);
    }

    return (
        <div className={styles.card_content}>
            <UserCountry {...props}/>
            <UserState {...props}/>
            <UserZipCode className={styles.zip_code} {...props}/>
            <UserCity className={styles.city} {...props}/>
            <UserStreet className={styles.street} {...props}/>
            <UserAddressComplement className={styles.complement} {...props}/>
        </div>
    );
}