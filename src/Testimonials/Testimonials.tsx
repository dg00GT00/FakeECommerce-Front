import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import {TestimonialsCard} from "./TestimonialsCards/TestimonialsCard";
import avatar1 from "../Assets/TestimonialsImages/avatar1.jpg";
import avatar2 from "../Assets/TestimonialsImages/avatar2.jpg";
import avatar3 from "../Assets/TestimonialsImages/avatar3.jpg";

import styles from "./Testimonials.module.scss";

type TestimonialsType = {
    image: string,
    name: string,
    children: string
}

const testimonialsContent: TestimonialsType[] = [
    {
        image: avatar1,
        name: "Harley Morrison",
        children: "Their services are amazing! What I brought simply didn't ship. FakeCommerce really delivers what it promises"
    },
    {
        image: avatar2,
        name: "Rhea Thompson",
        children: "No words to describe my expectation. It is so sensational and it grabbed my attention so quickly that looks like fake news"
    },
    {
        image: avatar3,
        name: "Betty Berry",
        children: "It's not real. I'm just kidding. I beg that there is another online shop which provides so high quality products and service time"
    }
]

export const Testimonials: React.FunctionComponent = () => {
    const testimonialsArray = testimonialsContent.map((card, index) =>
        (
            <TestimonialsCard img={card.image} name={card.name} key={index}>
                {card.children}
            </TestimonialsCard>
        )
    )

    return (
        <>
            <LandingMarketing color={"primary"}>
                <p className={styles.marketing}>It's <span className={styles.fakee}>unbelievable,</span> right?</p>
            </LandingMarketing>
            <div className={styles.testimonial_content}>
                {testimonialsArray}
            </div>
        </>
    )
}