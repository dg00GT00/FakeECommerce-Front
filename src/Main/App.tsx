import * as React from "react";
import {Header} from "../Header/Header";
import {MainLanding} from "../HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "../ProductsSection/ProductsSection";
import {Testimonials} from "../Testimonials/Testimonials";


const App = () => {
    return (
        <>
            <Header/>
            <MainLanding/>
            <ProductsSection/>
            <Testimonials/>
        </>
    );
}

export default App;
