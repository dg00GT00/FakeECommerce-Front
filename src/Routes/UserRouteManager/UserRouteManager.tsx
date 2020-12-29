import * as React from "react";
import {Route, useRouteMatch} from "react-router-dom";
import {UserCard} from "../../UserManagerSection/UserCard/UserCard";
import {makeStyles} from "@material-ui/core/styles";
import {ComplementaryColors} from "../../Utilities/Theme/CustomTheme";
import {UserSignup} from "../../UserManagerSection/UserSignup/UserSigunp";
import {UserLogin} from "../../UserManagerSection/UserLogin/UserLogin";
import {FormId} from "../../UserManagerSection/UserFormsTypes/UserFormsTypes";
import {UserAddress} from "../../UserManagerSection/UserAddress/UserAddress";
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme} from "@material-ui/core/styles/createMuiTheme";

const userStyle = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: ComplementaryColors.tertiary.main,
            padding: "0 1%",
        },
        background: {
            backgroundColor: theme.palette.secondary.main
        }
    })
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
            <Route exact path={`${path}/address`}>
                <UserCard cardType={"Address"} formId={"address"} background={style.background}>
                    <UserAddress {...customInputLabel} formId={FormId.ADDRESS} showRequiredLabel={true}/>
                </UserCard>
            </Route>
        </>
    );
}
