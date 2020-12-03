import * as React from "react";
import {MainLanding} from "../HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "../ProductsSection/ProductsSection";
import {Testimonials} from "../Testimonials/Testimonials";
import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";


const App = () => {
    return (
        <>
            <Header/>
            <MainLanding/>
            <ProductsSection/>
            <Testimonials/>
            <Footer/>
        </>
    );
}

export default App;
