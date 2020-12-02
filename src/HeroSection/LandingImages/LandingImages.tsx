import * as React from "react";
import firstImage from "../../Assets/FrontImages/frontImage1.webp"
import secondImage from "../../Assets/FrontImages/frontImage2.webp"
import styles from "./LandingImages.module.scss";


export const LandingImages: React.FunctionComponent = props => {
    const [image, changeImage] = React.useState(firstImage);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (image === firstImage) {
                changeImage(secondImage);
            } else {
                changeImage(firstImage)
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [image])

    return (
        <div className={styles.front_images}>
            <div className={styles.gradient}>
                {props.children}
            </div>
            <img className={styles.images} src={image} alt={"Front page images"} height={"700"}/>
        </div>
    )
}