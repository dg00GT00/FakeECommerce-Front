import * as React from "react";
import styles from "./UserAddress.module.scss";
import {UserCountry} from "./UserAddressFields/UserCountry";
import {UserState} from "./UserAddressFields/UserState";
import {UserZipCode} from "./UserAddressFields/UserZipCode";
import {UserCity} from "./UserAddressFields/UserCity";
import {UserStreet} from "./UserAddressFields/UserStreet";
import {UserAddressComplement} from "./UserAddressFields/UserAddressComplement";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";
import {UserActionButton} from "../UserActions/UserActionButton";
import {useUserAccountFormValidation} from "../../Utilities/CustomHooks/formValidation/useUserAccountFormValidation";


export const UserAddress: React.FunctionComponent<UserInputTypes> = props => {
    const [country, setCountry] = React.useState<string>("");
    const {
        validationFunctions: {requiredValidation},
        validationState: {formState, errorState}
    } = useUserAccountFormValidation(["email", "password", "repeatPassword"]);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const value = event.target.value as string;
        setCountry(value);
    }

    return (
        <>
            <div className={styles.card_content}>
                <UserCountry funcValidation={requiredValidation} {...props}/>
                <UserState {...props}/>
                <UserZipCode className={styles.zip_code} funcValidation={requiredValidation} {...props}/>
                <UserCity className={styles.city} {...props}/>
                <UserStreet className={styles.street} funcValidation={requiredValidation} {...props}/>
                <UserAddressComplement className={styles.complement} funcValidation={requiredValidation} {...props}/>
            </div>
            {props.showRequiredLabel ? <p>* fields required</p> : null}
            <UserActionButton formId={props.formId} formValidity={errorState} formState={formState}/>
        </>
    );
}