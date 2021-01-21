import * as React from "react";
import {TextField} from "@material-ui/core";
import {useCreditCardFormValidation} from "../../Utilities/CustomHooks/FormValidation/useCreditCardFormValidation";

export const CreditCardForms: React.FunctionComponent = () => {

    const {
        validationState: {formState},
        validationFunctions: {
            blankFieldValidation,
            genericFieldValidation,
            creditCardCVVValidation,
            creditCardNumberValidation,
            creditCardValidityValidation
        }
    } = useCreditCardFormValidation();

    const isFirstRender = React.useRef(true);
    const cardNumberRef = React.useRef<HTMLInputElement | null>(null);
    const cardValidityRef = React.useRef<HTMLInputElement | null>(null);
    const cvvRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (isFirstRender.current && cardNumberRef.current && cardValidityRef.current) {
            creditCardNumberValidation(`#${cardNumberRef.current?.id}`);
            creditCardValidityValidation(`#${cardValidityRef.current?.id}`)
            isFirstRender.current = false;
        }
    }, [creditCardNumberValidation, creditCardValidityValidation, creditCardCVVValidation]);

    return (
        <>
            <TextField
                required
                label={"Card Username"}
                onChange={event => genericFieldValidation(event, "username")}
                onBlur={event => blankFieldValidation(event, "username")}
                error={formState.username.requiredValidity}
                placeholder={"Credit Card Username"}
                id={"card_name"}
                variant={"outlined"}
                color={"primary"}/>
            <TextField
                required
                id={"card_number"}
                inputRef={cardNumberRef}
                onBlur={event => blankFieldValidation(event, "cardnumber")}
                error={formState.cardnumber.requiredValidity}
                placeholder={"XXXX XXXX XXXX XXXX"}
                variant={"outlined"}
                color={"primary"}/>
            <TextField
                required
                id={"card_validity"}
                inputRef={cardValidityRef}
                onBlur={event => blankFieldValidation(event, "cardvalidity")}
                error={formState.cardvalidity.requiredValidity}
                placeholder={"MM/YY"}
                variant={"outlined"}
                color={"primary"}/>
            <TextField
                required
                id={"cvv"}
                inputRef={cvvRef}
                onChange={_ => creditCardCVVValidation(cvvRef)}
                onBlur={event => blankFieldValidation(event, "cvv")}
                error={formState.cvv.requiredValidity}
                placeholder={"CVV"}
                variant={"outlined"}
                color={"primary"}/>
        </>
    );
}