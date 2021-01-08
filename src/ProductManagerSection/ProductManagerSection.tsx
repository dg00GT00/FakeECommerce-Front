import * as React from "react";
import {Header} from "../StructureSection/Header/Header";
import {MainLanding} from "../StructureSection/HeroSection/MainTextHero/MainLanding";
import {ProductsSection} from "./ProductsSection/ProductsSection";
import {Testimonials} from "../StructureSection/Testimonials/Testimonials";
import {Footer} from "../StructureSection/Footer/Footer";
import {ProductModalRouteManager} from "../Routes/ProductRouteManager/ProductModalRouteManager";

export const ProductManagerSection: React.FunctionComponent = () => {
    return (
        <>
            <Header/>
            <MainLanding/>
            <ProductModalRouteManager/>
            <ProductsSection/>
            <Testimonials/>
            <Footer/>
        </>
    );
}
