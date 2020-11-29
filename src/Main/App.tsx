import * as React from "react";
import {Header} from "../Header/Header";
import {MainLanding} from "../HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "../ProductsSection/ProductsSection";


const App = () => {
    return (
        <>
            <Header/>
            <MainLanding/>
            <ProductsSection/>
        </>
    );
}

export default App;
