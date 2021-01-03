import {RouteComponentProps} from "react-router-dom";
import {ProductFilterType} from "../../HttpRequests/ProductRequestManager";

export type ProductGridRouteManagerProps = RouteComponentProps & ProductFilterType;