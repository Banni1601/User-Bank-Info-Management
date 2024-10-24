import React from 'react';
import './InteractiveImage.css'



//Component for InteractiveImage
const InteractiveImage = () => {
    
    

    return (
        <div
           
            className=" interactive_image overflow-hidden rounded-lg transition-transform duration-100"
            
            style={{
                backgroundImage: `url(${"https://res.cloudinary.com/dwn5ul84h/image/upload/v1729611482/zpo0mvw3p04xcvz2psxf.webp"})`,
                backgroundSize: 'cover',
    
            }}
        >  
        </div>
    );
};

export default InteractiveImage;
