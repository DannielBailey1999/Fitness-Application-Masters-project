import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({
    prog,
    innerBorderColor,
    containerborderColor,
    containerBgr
}) => {
    return (
        <View 
            style={{
                borderRadius: 4,
                borderColor: containerborderColor,
                backgroundColor: containerBgr,
                width: '80%',
                borderWidth: 2
            }}
        >
            <View
                style={{
                    width: prog,
                    height: 20, // Added height for visibility
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: innerBorderColor,
                    backgroundColor: innerBorderColor
                }}
            />
        </View>
    );
};

export default ProgressBar;