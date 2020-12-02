import * as React from "react";
import {Header} from "../Header/Header";
import {MainLanding} from "../HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "../ProductsSection/ProductsSection";
import {Testimonials} from "../Testimonials/Testimonials";
import {Footer} from "../Footer/Footer";


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
