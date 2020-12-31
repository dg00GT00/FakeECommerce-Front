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
import {UserFirstName} from "./UserAddressFields/UserFirstName";
import {UserLastName} from "./UserAddressFields/UserLastName";
import {AuthContext} from "../../Utilities/Context/AuthContext";
import {useHistory} from "react-router-dom";
import {UserSnackbar} from "../UserActions/UserSnackbar";
import {MessageState} from "../UserActions/UserActionTypes";
import {AddressFieldId, FormState} from "../UserFormsTypes/UserFormsTypes";
import {useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";

export const UserAddress: React.FunctionComponent<UserInputTypes> = props => {
    const {
        validationFunctions: {genericFieldValidation, getFieldValueValidation, resetFormState},
        validationState: {addressFormState, errorState}
    } = useAddressFormValidation(["complement"]);

    const message = React.useRef<MessageState>({message: undefined, stateCount: 0});
    const [userSnack, setUserSnack] = React.useState<JSX.Element | null>(null);
    const {getUserAddress} = React.useContext(AuthContext);
    const {palette: {primary: {dark}}} = useTheme();
    const {location: {pathname}, push} = useHistory();

    React.useEffect(() => {
        if ("/user/address/update" === pathname) {
            const goToLogin: React.MouseEventHandler = event => {
                push("/user/login");
            }

            getUserAddress()
                .then(response => {
                    resetFormState((response as FormState<AddressFieldId>));
                })
                .catch(error => {
                    setUserSnack(_ => {
                        message.current = {
                            message: error,
                            stateCount: message.current.stateCount === 0 ? 1 : 0
                        };
                        return (
                            <UserSnackbar {...message.current}
                                          color={dark}
                                          severity={"warning"}>
                                <Button color={"secondary"} onClick={goToLogin}>Login</Button>
                            </UserSnackbar>
                        )
                    });
                })
        }
    }, [resetFormState, pathname, dark, push, getUserAddress]);

    return (
        <>
            <div className={styles.card_content}>
                <UserFirstName formState={addressFormState}
                               funcValidation={genericFieldValidation}
                               {...props}/>
                <UserLastName formState={addressFormState}
                              funcValidation={genericFieldValidation}
                              {...props}/>
                <UserCountry formState={addressFormState}
                             funcValidation={genericFieldValidation}
                             {...props}/>
                <UserState formState={addressFormState}
                           funcValidation={genericFieldValidation}
                           {...props}/>
                <UserZipCode className={styles.zip_code}
                             formState={addressFormState}
                             funcValidation={genericFieldValidation}
                             {...props}/>
                <UserCity className={styles.city}
                          formState={addressFormState}
                          funcValidation={genericFieldValidation}
                          {...props}/>
                <UserStreet className={styles.street}
                            formState={addressFormState}
                            funcValidation={genericFieldValidation}
                            {...props}/>
                <UserAddressComplement className={styles.complement}
                                       formState={addressFormState}
                                       funcValidation={getFieldValueValidation}
                                       {...props}/>
            </div>
            {props.showRequiredLabel ? <p>* fields required</p> : null}
            <UserActionButton formId={props.formId} formValidity={errorState} formState={addressFormState}/>
            {userSnack}
        </>
    );
}