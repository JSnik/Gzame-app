import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';

export default function MainScreen() {
    const insets = useSafeAreaInsets();

    const handleLogout = () => {
        router.replace('/');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.title}>GzaMe</Text>
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <LogOut size={24} color="#666" />
                </Pressable>
            </View>

            <View style={styles.content}>
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
                <Text style={styles.welcomeText}>Welcome to GzaMe!</Text>
                <Text style={styles.subText}>Your main app content goes here</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#6B4FE8',
    },
    logoutButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    sunIcon: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    sunCenter: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#6B4FE8',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    spiral: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2.5,
        borderColor: 'white',
        borderRightColor: 'transparent',
        transform: [{ rotate: '45deg' }],
    },
    sunRay: {
        position: 'absolute',
        width: 6,
        height: 20,
        backgroundColor: '#6B4FE8',
        borderRadius: 3,
        top: 5,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    subText: {
        fontSize: 16,
        color: '#666',
    },
});
