import * as React from "react";
import firstImage from "../../Assets/FrontImages/frontImage1.webp"
import secondImage from "../../Assets/FrontImages/frontImage2.webp"
import styles from "./LandingImages.module.scss";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {GeneralMediaQueries} from "../../Utilities/Theme/GeneralMediaQueries";


export const LandingImages: React.FunctionComponent = props => {
    const theme = useTheme();
    let mediaTablet = useMediaQuery(`(max-width: ${GeneralMediaQueries.TABLET})`);
    const [image, changeImage] = React.useState(firstImage);
    const [imageBackground, setImageBackground] = React.useState({});

    React.useEffect(() => {
        // The previous 'prevBackground' only has a value after the first render of this component
        setImageBackground(prevBackground => {
            if (mediaTablet && Object.keys(prevBackground || {}).length === 0) {
                return {
                    backgroundColor: theme.palette.primary.dark
                }
            }
            if (!mediaTablet && Object.keys(prevBackground || {}).length !== 0) {
                return {}
            }
        })
    }, [mediaTablet, theme.palette.primary.dark])

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!mediaTablet) {
            interval = setInterval(() => {
                if (image === firstImage) {
                    changeImage(secondImage);
                } else {
                    changeImage(firstImage)
                }
            }, 5000)
        }
        return () => clearInterval(interval)
    }, [image, mediaTablet])

    return (
        <div className={styles.front_images}>
            <div className={styles.gradient} style={imageBackground}>
                {props.children}
            </div>
            <img className={styles.images} src={image} alt={"Front page images"} height={"700"}/>
        </div>
    )
}