import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {GlobalRouteManager} from "../Routes/GlobalRouteManager";


const App = () => {
    return (
        <BrowserRouter>
            <GlobalRouteManager/>
        </BrowserRouter>
    );
}

export default App;
