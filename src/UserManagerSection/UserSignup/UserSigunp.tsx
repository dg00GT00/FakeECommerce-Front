import * as React from "react";
import {TextField} from "@material-ui/core";
import {UserInputTypes} from "../../Utilities/ProductModels/UserInputTypes";

type FormId = "username" | "email" | "password" | "repeatPassword";

type FormState = Record<FormId, { errorState: boolean }>;

const initialFormState: FormState = {
    username: {errorState: false},
    email: {errorState: false},
    password: {errorState: false},
    repeatPassword: {errorState: false},
};

export const UserSignup: React.FunctionComponent<UserInputTypes> = props => {
    const [formState, setFormState] = React.useState<FormState>(initialFormState);

    const checkValidity = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, formId: FormId) => {
        setFormState(prevFormState => {
            const state = prevFormState ?? formState;
            const errorState = !event.target.checkValidity();
            return {
                ...state,
                [formId]: {
                    ...state[formId],
                    errorState
                }
            }
        });
    }

    return (
        <>
            <TextField color={"primary"}
                       error={formState.username.errorState}
                       fullWidth
                       required
                       id="username"
                       label="Username"
                       type="text"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => checkValidity(event, "username")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.username.errorState ? "the username field is required" : null}
                       {...props}/>
            <TextField color={"primary"}
                       error={formState.email.errorState}
                       fullWidth
                       required
                       id="email"
                       label="Email"
                       type="email"
                       variant="outlined"
                       size={"small"}
                       onBlur={event => checkValidity(event, "email")}
                       FormHelperTextProps={{error: true}}
                       helperText={formState.email.errorState ? "the email field is required" : null}
                       {...props}/>
            <TextField color={"primary"}
                       required
                       id="password"
                       label="Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       {...props}/>
            <TextField color={"primary"}
                       id="repeat-password"
                       label="Repeat Password"
                       type="password"
                       variant="outlined"
                       size={"small"}
                       fullWidth
                       required
                       {...props}/>
        </>
    );
}