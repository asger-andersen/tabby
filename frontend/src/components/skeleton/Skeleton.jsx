import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, radius, count, direction, gap }) => {
    return (
        <div className={`flex flex-${direction} justify-center items-center gap-${gap}`}>
            {Array.from({ length: count }).map((_, index) => (
                <span
                    key={index}
                    className="skeleton"
                    style={{
                        width,
                        height,
                        borderRadius: radius,
                    }}
                ></span>
            ))}
        </div>
    );
};


export default Skeleton