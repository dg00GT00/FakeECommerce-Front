import {RouteComponentProps} from "react-router-dom";
import {ProductFilterType} from "../../HttpRequests/ProductsRequests";

export type ProductRouteManagerProps = RouteComponentProps & ProductFilterType;