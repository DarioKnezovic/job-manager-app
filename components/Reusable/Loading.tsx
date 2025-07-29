import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoadingIndicatorProps {
    size?: 'small' | 'large';
    overlay?: boolean;
}

export default function LoadingIndicator({
                                             size = 'large',
                                             overlay = false
                                         }: LoadingIndicatorProps) {
    const theme = useTheme();
    const spinValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;

    // Set dimensions based on size
    const spinnerSize = size === 'large' ? 40 : 24;
    const borderWidth = size === 'large' ? 4 : 3;

    useEffect(() => {
        // Rotation animation
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Pulsing animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: 600,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true
                }),
                Animated.timing(scaleValue, {
                    toValue: 0.8,
                    duration: 600,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [spinValue, scaleValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const spinnerElement = (
        <Animated.View
            style={{
                transform: [
                    { rotate: spin },
                    { scale: scaleValue }
                ]
            }}
        >
            <View
                style={[
                    styles.spinner,
                    {
                        width: spinnerSize,
                        height: spinnerSize,
                        borderRadius: spinnerSize / 2,
                        borderWidth: borderWidth,
                        borderTopColor: theme.colors.primary,
                        borderRightColor: 'transparent',
                        borderBottomColor: theme.colors.primary,
                        borderLeftColor: 'transparent'
                    }
                ]}
            />
        </Animated.View>
    );

    if (overlay) {
        return (
            <View style={styles.overlayContainer}>
                <View style={styles.overlayBackground}>
                    {spinnerElement}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {spinnerElement}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    overlayBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        padding: 24,
    },
    spinner: {
        borderStyle: 'solid',
    }
});