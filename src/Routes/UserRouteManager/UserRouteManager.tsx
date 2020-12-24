import * as React from "react";
import {Route, useRouteMatch} from "react-router-dom";
import {UserCard} from "../../UserManagerSection/UserCard/UserCard";
import {makeStyles} from "@material-ui/core/styles";
import {ComplementaryColors} from "../../Utilities/Theme/CustomTheme";
import {UserSignup} from "../../UserManagerSection/UserSignup/UserSigunp";
import {UserLogin} from "../../UserManagerSection/UserLogin/UserLogin";
import {FormId} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";

const userStyle = makeStyles({
    root: {
        backgroundColor: ComplementaryColors.tertiary.main,
        padding: "0 1%"
    }
});

export const UserRouteManager: React.FunctionComponent = () => {
    const {path} = useRouteMatch();
    const style = userStyle();

    const customInputLabel = {
        InputLabelProps: {
            classes: {
                root: style.root
            }
        },
        InputProps: {
            notched: false
        }
    };

    return (
        <>
            <Route exact path={`${path}/signup`}>
                <UserCard cardType={"Signup"} formId={"signup"}>
                    <UserSignup {...customInputLabel} formId={FormId.SIGNUP} showRequiredLabel={true}/>
                </UserCard>
            </Route>
            <Route exact path={`${path}/login`}>
                <UserCard cardType={"Login"} formId={"login"}>
                    <UserLogin {...customInputLabel} formId={FormId.LOGIN} showRequiredLabel={true}/>
                </UserCard>
            </Route>
        </>
    );
}
