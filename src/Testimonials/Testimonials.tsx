import * as React from "react";
import {LandingMarketing} from "../LandingMarketing/LandingMarketing";
import {TestimonialsCard} from "./TestimonialsCards/TestimonialsCard";
import avatar1 from "../Assets/TestimonialsImages/avatar1.jpg";

import styles from "./Testimonials.module.scss";

export const Testimonials: React.FunctionComponent = () => {
    return (
        <>
            <LandingMarketing color={"primary"}>
                <p className={styles.marketing}>It's <span className={styles.fakee}>unbelievable,</span> right?</p>
            </LandingMarketing>
            <TestimonialsCard img={avatar1} name={"Harley Morrison"}>
                Their services are amazing! What I brought simply didn't ship. FakeCommerce really delivers what it promises
            </TestimonialsCard>
        </>
    )
}