import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, MessageCircle, Apple } from 'lucide-react-native';

export default function WelcomeScreen() {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#6B4FE8', '#8B6FFF', '#A88FFF']}
            style={styles.container}
        >
            <View style={[styles.content, { paddingTop: insets.top + 60 }]}>
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
                </View>

                <Text style={styles.title}>Welcome to GzaMe</Text>
                <Text style={styles.subtitle}>
                    Collect points as you get added on your dashboard{'\n'}or world map
                </Text>
            </View>

            <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 40 }]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        styles.buttonEmail,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => router.push('/signin')}
                >
                    <Mail size={20} color="#6B4FE8" />
                    <Text style={[styles.buttonText, styles.buttonTextDark]}>Continue with Email</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        styles.buttonTransparent,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => {}}
                >
                    <MessageCircle size={20} color="white" />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        styles.buttonTransparent,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() => {}}
                >
                    <Apple size={20} color="white" />
                    <Text style={styles.buttonText}>Continue with Apple</Text>
                </Pressable>

                <Text style={styles.signinText}>
                    Already a user?{' '}
                    <Text style={styles.signinLink} onPress={() => router.push('/signin')}>
                        Sign in
                    </Text>
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 24,
    },
    sunIcon: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sunCenter: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    spiral: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2.5,
        borderColor: '#6B4FE8',
        borderRightColor: 'transparent',
        transform: [{ rotate: '45deg' }],
    },
    sunRay: {
        position: 'absolute',
        width: 6,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 3,
        top: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.85)',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 40,
    },
    buttonContainer: {
        paddingHorizontal: 24,
        gap: 12,
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 16,
        borderRadius: 12,
    },
    buttonEmail: {
        backgroundColor: 'white',
    },
    buttonTransparent: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
    buttonTextDark: {
        color: '#6B4FE8',
    },
    signinText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginTop: 8,
    },
    signinLink: {
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
