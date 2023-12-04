import React, {useEffect, useState} from 'react';
import milk_data from '../assets/milk_data';

function comparisonSentence(milkType1, milkType2, ratio, key) {
    console.log(milkType1, milkType2, ratio, key)

    if (key === 'Land Use ') {
        return (
            <p><b>{milkType1}</b> uses <b>{ratio}x</b> more land than <b>{milkType2}</b> milk.</p>
        )
    } else if (key === 'Water Use ') {
        return (
            <p><b>{milkType1}</b> uses <b>{ratio}x</b> more water than <b>{milkType2}</b> milk.</p>
        )
    } else if (key === 'Greenhouse Gas Emissions ') {
        return (
            <p><b>{milkType1}</b> emits <b>{ratio}x</b> more greenhouse gases than <b>{milkType2}</b> milk.</p>
        )
    } else if (key === 'Eutrophication ') {
        return (
            <p><b>{milkType1}</b> produces <b>{ratio}x</b> more acidic runoff than <b>{milkType2}</b> milk.</p>
        )
    }
}

function MilkGraph({ milkType1, milkType2, className}) {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data1 = milk_data[milkType1];
    const data2 = milk_data[milkType2];

    if (!data1 || !data2) {
        return <p>No data available for {milkType1} or {milkType2}</p>;
    }

    return (
        <>
            {Object.keys(data1).map((key) => {
                const maxValue = Math.max(data1[key], data2[key]);
                const scale = (40 * viewportWidth / 100) / maxValue; // For example, 30vw

                const value1 = data1[key] * scale;
                const value2 = data2[key] * scale;

                const capitalisedMilkType1 =
                    milkType1.charAt(0).toUpperCase()
                    + milkType1.slice(1)
                const capitalisedMilkType2 =
                    milkType2.charAt(0).toUpperCase()
                    + milkType2.slice(1)
                const firstBar = { name : capitalisedMilkType1, value: value1, label: `${data1[key]}`, color: 'wheat' };
                const secondBar = { name : capitalisedMilkType2, value: value2, label: `${data2[key]}`, color: 'goldenrod' };

                const keyString = key.slice(0, key.indexOf('('))
                const ratio = value1 / value2;
                const ratioFormatted = ratio >= 1 ? ratio.toFixed(1) : (1 / ratio).toFixed(1);
                const isGreater = ratio >= 1;
                const comparisonStatement = isGreater ?
                    comparisonSentence(capitalisedMilkType1, milkType2, ratioFormatted, keyString) :
                    comparisonSentence(capitalisedMilkType2, milkType1, ratioFormatted, keyString);

                return (
                    <div className={className} key={key}>
                        <h3>{key}</h3>
                        <svg width={viewportWidth > 600 ? "45vw" : "80vw"} height="10vw">
                            {/* First (smaller) bar */}
                            <rect x="14%" width={firstBar.value} height="3vw" style={{ fill: firstBar.color }} />
                            <text x={`${firstBar.value + (12 * viewportWidth / 100)}`} y="18%" alignmentBaseline="middle">{firstBar.label}</text>
                            <text y="18%" alignmentBaseline="middle">{firstBar.name}</text>

                            {/* Second (larger) bar */}
                            <rect x="14%" y="50%" width={secondBar.value} height="3vw" style={{ fill: secondBar.color }} />
                            <text x={secondBar.value + (12 * viewportWidth / 100)} y="68%" alignmentBaseline="middle">{secondBar.label}</text>
                            <text y="68%" alignmentBaseline="middle">{secondBar.name}</text>
                        </svg>
                        {comparisonStatement}
                    </div>
                );
            })}
        </>
    );
}

export default MilkGraph;
