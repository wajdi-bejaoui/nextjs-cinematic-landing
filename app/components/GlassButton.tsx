import React from "react";
import GlassContainer from "./GlassContainer";


const GlassButton = ({ children, width, height }: { children: React.ReactNode, width?: any, height?: any }) => {
    return (
        <div className="">
            <GlassContainer width={width} height={height}>
                {children}
            </GlassContainer>
        </div>
    );
};

export default GlassButton;