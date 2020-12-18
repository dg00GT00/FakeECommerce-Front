import * as React from "react";
import styles from "./UserAddress.module.scss";
import {UserCountry} from "./UserAddress/UserCountry";
import {UserState} from "./UserAddress/UserState";
import {UserZipCode} from "./UserAddress/UserZipCode";
import {UserCity} from "./UserAddress/UserCity";
import {UserStreet} from "./UserAddress/UserStreet";
import {UserAddressComplement} from "./UserAddress/UserAddressComplement";


export const UserAddress: React.FunctionComponent = () => {
    const [country, setCountry] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCountry(value);
    }

    return (
        <div className={styles.card_content}>
            <UserCountry/>
            <UserState/>
            <UserZipCode className={styles.zip_code}/>
            <UserCity className={styles.city}/>
            <UserStreet className={styles.street}/>
            <UserAddressComplement className={styles.complement}/>
        </div>
    );
}