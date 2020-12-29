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
import {useAddressFormValidation} from "../../Utilities/CustomHooks/formValidation/useAddressFormValidation";


export const UserAddress: React.FunctionComponent<UserInputTypes> = props => {
    const {
        validationFunctions: {genericFieldValidation},
        validationState: {formState, errorState}
    } = useAddressFormValidation();

    return (
        <>
            <div className={styles.card_content}>
                <UserCountry formState={formState}
                             funcValidation={genericFieldValidation}
                             {...props}/>
                <UserState formState={formState}
                           funcValidation={genericFieldValidation}
                           {...props}/>
                <UserZipCode className={styles.zip_code}
                             formState={formState}
                             funcValidation={genericFieldValidation}
                             {...props}/>
                <UserCity className={styles.city}
                          formState={formState}
                          funcValidation={genericFieldValidation}
                          {...props}/>
                <UserStreet className={styles.street}
                            formState={formState}
                            funcValidation={genericFieldValidation}
                            {...props}/>
                <UserAddressComplement className={styles.complement}
                                       formState={formState}
                                       funcValidation={genericFieldValidation}
                                       {...props}/>
            </div>
            {props.showRequiredLabel ? <p>* fields required</p> : null}
            <UserActionButton formId={props.formId} formValidity={errorState} formState={formState}/>
        </>
    );
}