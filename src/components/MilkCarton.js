import React from "react";
import "./Arrow.css";

function MilkCarton({cartonImage, cartonType, cartonAnimation, handleClick, cartonNumber}) {
  return (
      <div className="milk-carton">
          {cartonImage && <img className={`milk-image ${cartonAnimation}`} src={cartonImage} alt={cartonType + ' milk carton'} />}
          <div className="pointer left" onClick={() => handleClick('left', cartonNumber)}/>
          <div className="pointer right" onClick={() => handleClick('right', cartonNumber)}/>
      </div>
  )
}

export default MilkCarton;
