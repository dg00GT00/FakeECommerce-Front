import * as React from "react";
import {CartContextProvider} from "../Utilities/Context/CartContext";
import {Header} from "../StructureSection/Header/Header";
import {MainLanding} from "../StructureSection/HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "./ProductsSection/ProductsSection";
import {Testimonials} from "../StructureSection/Testimonials/Testimonials";
import {Footer} from "../StructureSection/Footer/Footer";
import {ProductModalRouteManager} from "../Routes/ProductRouteManager/ProductModalRouteManager";

export const ProductManagerSection: React.FunctionComponent = () => {
    return (
        <>
            <CartContextProvider>
                <Header/>
                <MainLanding/>
                <ProductModalRouteManager/>
                <ProductsSection/>
            </CartContextProvider>
            <Testimonials/>
            <Footer/>
        </>
    );
}
