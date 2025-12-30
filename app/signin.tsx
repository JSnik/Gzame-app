import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Eye, X } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

// Custom Button Component for reusability and styling consistency
const GradientButton = ({ onPress, text, style }) => (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.buttonWrapper,
            pressed && styles.buttonPressed,
            style,
        ]}
    >
        <LinearGradient
            colors={['rgba(255, 194, 0, 1)', 'rgba(255, 160, 15, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.buttonGradient}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </LinearGradient>
    </Pressable>
);

export default function SignInScreen() {
    const insets = useSafeAreaInsets();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSignIn = () => {
        console.log('Sign in', { nickname, password });
        router.replace('/main');
    };

    return (
        // Removed the outer LinearGradient and set container background to white
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                {/* Back Button with Blur Container */}
                <BlurView intensity={12} tint="light" style={styles.backButtonBlurContainer}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <ChevronLeft size={20} color="black" />
                    </Pressable>
                </BlurView>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        {/* Title and Subtitle - Text alignment is now center */}
                        <Text style={styles.cardTitle}>Sign in to GzaMe</Text>
                        <Text style={styles.cardSubtitle}>
                            Sign in to start on your health and happiness journey
                        </Text>

                        <View style={styles.form}>
                            {/* Nickname Input Group */}
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nickname"
                                    placeholderTextColor="#999"
                                    value={nickname}
                                    onChangeText={setNickname}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {/* Placeholder for the X icon */}
                                {nickname.length > 0 && (
                                    <Pressable
                                        onPress={() => setNickname('')}
                                        style={styles.inputIconRight}
                                    >
                                        <X size={18} color="#999" />
                                    </Pressable>
                                )}
                            </View>

                            {/* Password Input Group */}
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#999"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                                {/* Placeholder for the Eye icon */}
                                <Pressable style={styles.inputIconRight}>
                                    <Eye size={18} color="#999" />
                                </Pressable>
                            </View>

                            {/* Remember Me and Forgot Password Row */}
                            {/* This spacing is now handled correctly by styles.form gap */}
                            <View style={styles.checkboxRow}>
                                <Pressable
                                    onPress={() => setRememberMe(!rememberMe)}
                                    style={styles.checkboxContainer}
                                >
                                    <View style={[styles.checkbox, rememberMe && styles.checkboxActive]} />
                                    <Text style={styles.rememberMeText}>Remember me</Text>
                                </Pressable>
                                <Pressable onPress={() => router.push('/forgot-password')}>
                                    <Text style={styles.forgotText}>Forgot your password?</Text>
                                </Pressable>
                            </View>

                            {/* Main Button */}
                            <GradientButton
                                onPress={handleSignIn}
                                text="Create account"
                                style={styles.mainButtonMargin}
                            />

                            {/* Sign Up Link */}
                            <Text style={styles.signupText}>
                                Don't have an account?{' '}
                                <Text
                                    style={styles.signupLink}
                                    onPress={() => router.push('/signup')}
                                >
                                    Sign up
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
    },
    header: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    // --- Back Button Blur Style (Consistent) ---
    backButtonBlurContainer: {
        width: 38,
        height: 38,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    backButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // --- Card/Form Styles (Consistent) ---
    formContainer: {
        paddingTop: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardSubtitle: {
        fontSize: 15,
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
    },
    form: {
        flex: 1,
        gap: 16, // SYNCHRONIZED: Changed from 24 to 16 for consistent spacing
    },
    // --- Input Styles (SYNCHRONIZED with Sign Up Canvas) ---
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: 56,
        // REMOVED borderBottomWidth and borderBottomColor
    },
    input: {
        flex: 1,
        paddingVertical: 18,
        fontSize: 16,
        color: '#1a1a1a',
        height: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        borderWidth: 1, // Full border added
        borderColor: '#E0E0E0',
        borderRadius: 12, // Border radius added
    },
    inputIconRight: {
        position: 'absolute',
        right: 16, // SYNCHRONIZED: Aligned inside the input padding
        padding: 4,
    },
    // --- Checkbox and Forgot Password Row ---
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Removed explicit margins, relying on styles.form gap: 16
        marginTop: 0,
        marginBottom: 0,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 8,
    },
    checkboxActive: {
        backgroundColor: '#4A5FE8',
        borderColor: '#4A5FE8',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#666',
    },
    forgotText: {
        fontSize: 14,
        color: '#4A5FE8',
        fontWeight: '600',
    },
    // --- Button Styles (Consistent) ---
    mainButtonMargin: {
        marginTop: 32, // Maintains large break before action button
        marginBottom: 8,
    },
    buttonWrapper: {
        borderRadius: 16,
        height: 56,
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        opacity: 0.9,
    },
    buttonText: {
        color: '#1a1a1a',
        fontSize: 16,
        fontWeight: '700',
    },
    // --- Sign Up Link at the bottom (Consistent) ---
    signupText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    signupLink: {
        color: '#4A5FE8',
        fontWeight: '700',
    },
});