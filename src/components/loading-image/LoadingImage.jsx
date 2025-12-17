import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const MyImage = ({ alt, src, height, width }) => (
    <div>
        <LazyLoadImage
            alt={alt}
            effect="blur"
            height={height}
            src={src} 
            width={width} />
    </div>
);

export default MyImage;