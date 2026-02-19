import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styles, { BUTTON_COLOR_MAP, COLORS, BUTTON_SIZE } from '../styles/styles';

export default function ColorButton({ btnId, onPress, isFlashing, isUserFlash, disabled }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const bgColor = useRef(new Animated.Value(0)).current;

    const baseColor = BUTTON_COLOR_MAP[btnId];

    useEffect(() => {
        if (isFlashing || isUserFlash) {
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1.08,
                    duration: 120,
                    useNativeDriver: true,
                }),
            ]).start();

            bgColor.setValue(1);
        } else {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }).start();

            bgColor.setValue(0);
        }
    }, [isFlashing, isUserFlash, scaleAnim, bgColor]);

    const interpolatedBg = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: [baseColor, isUserFlash ? COLORS.userPress : COLORS.flash],
    });

    const interpolatedBorder = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.black, isUserFlash ? COLORS.userPress : COLORS.flash],
    });

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(btnId)}
            disabled={disabled}
        >
            <Animated.View
                style={[
                    styles.colorBtn,
                    {
                        backgroundColor: interpolatedBg,
                        borderColor: interpolatedBorder,
                        transform: [{ scale: scaleAnim }],
                        elevation: isFlashing || isUserFlash ? 16 : 4,
                        shadowColor: isFlashing ? COLORS.two : isUserFlash ? COLORS.userPress : 'transparent',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: isFlashing || isUserFlash ? 0.9 : 0,
                        shadowRadius: isFlashing || isUserFlash ? 15 : 0,
                    },
                ]}
            />
        </TouchableOpacity>
    );
}
