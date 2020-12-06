import * as React from "react";
import {MainLanding} from "../HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "../ProductsSection/ProductsSection";
import {Testimonials} from "../Testimonials/Testimonials";
import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";
import {CartContextProvider} from "../Cart/CartContext";


const App = () => {
    return (
        <>
            <CartContextProvider>
                <Header/>
                <MainLanding/>
                <ProductsSection/>
            </CartContextProvider>
            <Testimonials/>
            <Footer/>
        </>
    );
}

export default App;
