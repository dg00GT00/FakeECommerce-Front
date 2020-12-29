import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {PageParamsType} from "./ProductParams/PageParams";
import {NotFound} from "./NotFound";

const isPageNumber = (params: { [i: string]: any }): params is PageParamsType => {
    return (params as PageParamsType).pageNumber !== undefined;
};

const filterInt = (value: string): number | typeof NaN => {
    if (/^\d+|Infinity$/.test(value)) {
        return Number(value);
    } else {
        return NaN;
    }
};

type RouteValidationProps = {
    pageAmount: number;
    validateHome?: boolean;
};

const RouteValidation: React.FunctionComponent<RouteComponentProps<{ pageNumber: string }> & RouteValidationProps> = (props) => {
    if (props.validateHome !== undefined && props.validateHome) {
        if (!isPageNumber(props.match.params)) {
            return <NotFound/>;
        } else {
            const pageNumber = filterInt(props.match.params.pageNumber);
            if (
                isNaN(pageNumber) ||
                pageNumber > props.pageAmount ||
                pageNumber === 0
            ) {
                return <NotFound/>;
            }
        }
    }
    return <>{props.children}</>;
};

export const ProductRouteValidation = withRouter(RouteValidation);
