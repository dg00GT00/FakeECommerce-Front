import * as React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export const ProductGridSkeleton: React.FunctionComponent<{ skeletonItems: number }> = props => {
    const skeletonArray = [...Array(props.skeletonItems)].map((_, index) => {
        return (
            <div key={index}>
                {/*Values of width and height based on the product cards dimensions*/}
                {/*This dimensions should also change if the product card dimensions suffer variations*/}
                <Skeleton variant="text" width={350} height={50}/>
                <Skeleton variant="rect" width={350} height={400}/>
                <Skeleton variant="text" width={350} height={50}/>
            </div>
        )
    });

    return <>{skeletonArray}</>;
}
