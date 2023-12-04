import React, {useEffect, useState} from 'react';
import './Milks.css';
import MilkGraph from "../components/MilkGraph";
import MilkCarton from "../components/MilkCarton";


function Milks() {
    window.devicePixelRatio = 1;

    const milkTypes = ['oat', 'dairy', 'soy', 'almond'];
    const [carton1Type, setCarton1Type] = useState(milkTypes[0]);
    const [carton2Type, setCarton2Type] = useState(milkTypes[1]);

    const rotateMilkType = (currentType, excludeType) => {
        let availableTypes = milkTypes.filter(type => type !== excludeType);
        let currentIndex = availableTypes.indexOf(currentType);
        let newIndex = (currentIndex + 1) % availableTypes.length;
        return availableTypes[newIndex];
    };

    // New state for managing animation classes
    const [carton1Animation, setCarton1Animation] = useState('');
    const [carton2Animation, setCarton2Animation] = useState('');
    // New state for managing animation classes
    const [carton1TextAnimation, setCarton1TextAnimation] = useState('');
    const [carton2TextAnimation, setCarton2TextAnimation] = useState('');

    const animateCarton = (cartonNumber, newType, direction) => {
        const isLeft = direction === 'left';
        const setAnimation = cartonNumber === 1 ? setCarton1Animation : setCarton2Animation;
        const setTextAnimation = cartonNumber === 1 ? setCarton1TextAnimation : setCarton2TextAnimation;

        setAnimation(isLeft ? 'milk-image-exit-left' : 'milk-image-exit-right');
        setTextAnimation('milk-text-shrink');

        setTimeout(() => {
            if (cartonNumber === 1) {
                setCarton1Type(newType);
            } else {
                setCarton2Type(newType);
            }
            setAnimation(isLeft ? 'milk-image-enter-left' : 'milk-image-enter-right');
            setTextAnimation('milk-text-grow');
        }, 500);
    };

    // Updated handleClick function
    const handleClick = (direction, carton) => {
        let newType = carton === 1 ? rotateMilkType(carton1Type, carton2Type) : rotateMilkType(carton2Type, carton1Type);
        animateCarton(carton, newType, direction);
    };

    const [carton1Image, setCarton1Image] = useState('');
    const [carton2Image, setCarton2Image] = useState('');

    useEffect(() => {
        import(`../assets/${carton1Type}.png`)
            .then(module => setCarton1Image(module.default))
            .catch(error => {
                console.error('Error importing image:', error);
                // Handle the error or set a default image
            });
    }, [carton1Type]);

    useEffect(() => {
        import(`../assets/${carton2Type}.png`)
            .then(module => setCarton2Image(module.default))
            .catch(error => {
                console.error('Error importing image:', error);
                // Handle the error or set a default image
            });
    }, [carton2Type]);

    const [showMilkFillAnimation, setShowMilkFillAnimation] = useState(false);
    const [showMilkDrainAnimation, setShowMilkDrainAnimation] = useState(false);
    const [showMilkContainer, setShowMilkContainer] = useState(true);
    const [showMilkGraph, setShowMilkGraph] = useState(false);
    const handleButtonClick = () => {
        if (showMilkGraph) {
            document.body.style.backgroundColor = 'wheat';
            setShowMilkContainer(true);
            setShowMilkDrainAnimation(true);

            setTimeout(() => {
                setShowMilkFillAnimation(false);
                setShowMilkGraph(false);
                setShowMilkDrainAnimation(false);
            }, 2000);
            return;
        }
        setShowMilkFillAnimation(true);

        setTimeout(() => {
            document.body.style.backgroundColor = 'white';
            setShowMilkGraph(true);
            setShowMilkContainer(false);
        }, 2000);
    };

    return (
        <>
            {showMilkFillAnimation &&
                <div className={"milk-animation" + (showMilkDrainAnimation ? " drainMilk" : "")}>
                    <div onClick={handleButtonClick} className={"back-button"  + (showMilkGraph ? " fade-in" : "")}><b>&#11152;</b></div>
                    <div className="milk-container milk-graph-container">
                        <MilkGraph className={'milk-graph' + (showMilkGraph ? " fade-in" : "")} milkType1={carton1Type} milkType2={carton2Type}/>
                    </div>
                </div>
            }
            {showMilkContainer &&
                <div className="milk-container">
                    <MilkCarton cartonImage={carton1Image} cartonType={carton1Type} cartonAnimation={carton1Animation} handleClick={handleClick} cartonNumber={1}/>
                    <MilkCarton cartonImage={carton2Image} cartonType={carton2Type} cartonAnimation={carton2Animation} handleClick={handleClick} cartonNumber={2}/>
                    <div onClick={handleButtonClick} className={`button`}>compare <div style={{display:'inline-block'}} className={carton1TextAnimation}><b>{carton1Type}</b></div> to <div style={{display:'inline-block'}} className={carton2TextAnimation}><b>{carton2Type}</b></div> milk</div>
                </div>
            }
        </>
    );
}

export default Milks;
