import * as React from "react";
import {CartContextProvider} from "../Utilities/Context/CartContext";
import {Header} from "../StructureSection/Header/Header";
import {MainLanding} from "../StructureSection/HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "./ProductsSection/ProductsSection";
import {Testimonials} from "../StructureSection/Testimonials/Testimonials";
import {Footer} from "../StructureSection/Footer/Footer";

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
