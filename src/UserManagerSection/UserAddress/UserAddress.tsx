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
import {useAddressFormValidation} from "../../Utilities/CustomHooks/FormValidation/useAddressFormValidation";
import {UserFirstName} from "./UserAddressFields/UserFirstName";
import {UserLastName} from "./UserAddressFields/UserLastName";
import {AuthContext} from "../../Utilities/Context/AuthContext";
import {useHistory} from "react-router-dom";
import {AddressFieldId, FormId, FormState,} from "../UserFormsTypes/UserFormsTypes";
import {useSnackMessageError} from "../../Utilities/CustomHooks/UserSnackbar/useSnackMessageError";
import {CheckoutRoute} from "../../Utilities/CustomHooks/CheckoutRoute/CheckoutRoute";
import {useUserSnackbar} from "../../Utilities/CustomHooks/UserSnackbar/useUserSnackbar";

export const UserAddress: React.FunctionComponent<UserInputTypes> = (props) => {
    const {
        validationFunctions: {
            genericFieldValidation,
            getFieldValueValidation,
            resetFormState,
        },
        validationState: {addressFormState, errorState},
    } = useAddressFormValidation(["complement"]);

    const [errorSnack, setErrorSnack] = useSnackMessageError();
    const [infoSnack, setInfoSnack] = useUserSnackbar();

    const firstRender = React.useRef(true);
    const {getUserAddress} = React.useContext(AuthContext);
    const {
        location: {pathname, state},
    } = useHistory();

    React.useEffect(() => {
        if (firstRender.current) {
            if ("/user/address/update" === pathname) {
                firstRender.current = false;
                getUserAddress()
                    .then((response) => {
                        resetFormState(response as FormState<AddressFieldId>);
                        if (state === CheckoutRoute.TO_ADDRESS_UPDATE) {
                            setInfoSnack({message: "Update your address to continue buying", severity: "info"})
                        }
                    })
                    .catch((statusCode) => setErrorSnack(FormId.ADDRESS, statusCode));
            }
        }
    }, [setErrorSnack, resetFormState, pathname, state, getUserAddress, setInfoSnack]);

    return (
        <>
            <div className={styles.card_content}>
                <UserFirstName
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserLastName
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserCountry
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserState
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserZipCode
                    className={styles.zip_code}
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserCity
                    className={styles.city}
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserStreet
                    className={styles.street}
                    formState={addressFormState}
                    funcValidation={genericFieldValidation}
                    {...props}
                />
                <UserAddressComplement
                    className={styles.complement}
                    formState={addressFormState}
                    funcValidation={getFieldValueValidation}
                    {...props}
                />
            </div>
            {props.showRequiredLabel ? <p>* fields required</p> : null}
            <UserActionButton
                formId={props.formId}
                formValidity={errorState}
                formState={addressFormState}
            />
            {errorSnack}
            {infoSnack}
        </>
    );
};
