import React from 'react';

const Heading = ({ children,color,className }) => {
  return (
    <h1 className={`lg:text-4xl sm:text-3xl text-2xl sm:text-start xl:leading-[52px]  text-center font-medium ${className}`} style={{color:color}}>
      {children}
    </h1>
  );
};

export default Heading;
