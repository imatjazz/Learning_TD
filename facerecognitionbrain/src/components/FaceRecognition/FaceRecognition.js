import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box})=>{
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img 
                    id='inputimage'
                    // src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbYMPDoRP04ASNQpulI0YhIeIoTXLQUVCsDRLRlQ_ByUrz8nu-Tw'} 
                    src={imageUrl}
                    alt='display'
                    width= '500px'
                    heigh='auto'
                />
                <div className='bounding-box'
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                    }}>
                </div>
            </div>
          
        </div>
    )
}

export default FaceRecognition;