import * as React from "react";
import {CartContextProvider} from "../Utilities/Context/CartContext";
import {Header} from "./Header/Header";
import {MainLanding} from "./HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "./ProductsSection/ProductsSection";
import {Testimonials} from "./Testimonials/Testimonials";
import {Footer} from "./Footer/Footer";

export const ProductManagerSection: React.FunctionComponent = () => {
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
