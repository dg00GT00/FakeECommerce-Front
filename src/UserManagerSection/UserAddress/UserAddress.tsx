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
import {ActionTypes} from "../../Utilities/CustomHooks/formValidation/FormActionTypes";
import {AddressFieldId, FormState} from "../UserFormsTypes/UserFormsTypes";
import {useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";

export const UserAddress: React.FunctionComponent<UserInputTypes> = props => {
    const {
        validationFunctions: {genericFieldValidation},
        validationState: {addressFormReducer: [formState, dispatchFormState], errorState}
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
                    dispatchFormState({type: ActionTypes.RESET, newFormState: (response as FormState<AddressFieldId>)});
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
    }, [dispatchFormState, pathname, dark, push, getUserAddress]);

    return (
        <>
            <div className={styles.card_content}>
                <UserFirstName formState={formState}
                               funcValidation={genericFieldValidation}
                               {...props}/>
                <UserLastName formState={formState}
                              funcValidation={genericFieldValidation}
                              {...props}/>
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
                                       funcValidation={genericFieldValidation}
                                       {...props}/>
            </div>
            {props.showRequiredLabel ? <p>* fields required</p> : null}
            <UserActionButton formId={props.formId} formValidity={errorState} formState={formState}/>
            {userSnack}
        </>
    );
}