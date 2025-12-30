import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoadingScreen() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/onboarding');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient
            colors={['#5BA4D6', '#7FC0E8', '#A8D5F2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <View style={styles.sunIcon}>
                    <View style={styles.sunCenter}>
                        <View style={styles.spiral} />
                    </View>
                    {[...Array(8)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.sunRay,
                                {
                                    transform: [{ rotate: `${i * 45}deg` }],
                                },
                            ]}
                        />
                    ))}
                </View>
                <Text style={styles.appName}>GzaMe</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        gap: 16,
    },
    sunIcon: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sunCenter: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    spiral: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#5BA4D6',
        borderRightColor: 'transparent',
        transform: [{ rotate: '45deg' }],
    },
    sunRay: {
        position: 'absolute',
        width: 8,
        height: 25,
        backgroundColor: 'white',
        borderRadius: 4,
        top: 5,
    },
    appName: {
        fontSize: 32,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 1,
    },
});
