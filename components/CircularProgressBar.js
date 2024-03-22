import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

export default function CircularProgressBar({
    value,
    duration,
    textColor,
    fontSize,
    valueLable,
    inActiveStrokeWidth,
    inActiveStrokeColor,
    inActiveStrokeOpacity,
    activeStrokeColor,
    activeStrokeWidth,
}) {

    return (
        <CircularProgress
            radius={90}
            value={value ? value : 0}
            textColor={textColor ? textColor : '#222'}
            fontSize={fontSize ? fontSize : 20}
            valueSuffix={valueLable ? valueLable : '%'}
            inActiveStrokeColor={inActiveStrokeColor ? inActiveStrokeColor : '#7388A95A'}
            inActiveStrokeOpacity={inActiveStrokeOpacity ? inActiveStrokeOpacity : 0.2}
            inActiveStrokeWidth={inActiveStrokeWidth ? inActiveStrokeWidth : 20}
            activeStrokeWidth={activeStrokeWidth ? activeStrokeWidth : 20}
            activeStrokeColor={activeStrokeColor ? activeStrokeColor : "#5BBF4A"}
            duration={duration ? duration : 1500}
        />
    )
}