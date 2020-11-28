import * as React from "react";
import firstImage from "../Assets/FrontImages/frontImage1.jpg"
import styles from "./FrontImages.module.scss";


export const FrontImages: React.FunctionComponent = props => {
    const [image, changeImage] = React.useState(firstImage);

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (image === firstImage) {
    //             changeImage(secondImage);
    //         } else {
    //             changeImage(firstImage)
    //         }
    //     }, 10000)
    //     return () => clearInterval(interval)
    // }, [image])

    return (
        <section className={styles.front_images}>
            <div className={styles.gradient}/>
            <img className={styles.images} src={firstImage} alt={"Front page images"} height={"700"}/>
        </section>
    )
}