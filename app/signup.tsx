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

export default function SignUpScreen() {
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignUp = () => {
        console.log('Sign up', { name, email, password });
        // Navigate to the next screen after successful sign-up
        router.push('/questions-page');
    };

    return (
        // Changed outer LinearGradient to simple View for white background
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
                        {/* Title and Subtitle - Centered */}
                        <Text style={styles.cardTitle}>Create your account</Text>
                        <Text style={styles.cardSubtitle}>
                            Please enter your details to continue
                        </Text>

                        <View style={styles.form}>
                            {/* Name Input Group */}
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    placeholderTextColor="#999"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                                {name.length > 0 && (
                                    <Pressable
                                        onPress={() => setName('')}
                                        style={styles.inputIconRight}
                                    >
                                        <X size={18} color="#999" />
                                    </Pressable>
                                )}
                            </View>

                            {/* Email Input Group */}
                            <View style={styles.inputGroup}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#999"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {email.length > 0 && (
                                    <Pressable
                                        onPress={() => setEmail('')}
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
                                    secureTextEntry={!isPasswordVisible}
                                    autoCapitalize="none"
                                />
                                <Pressable
                                    style={styles.inputIconRight}
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                    <Eye size={18} color="#999" />
                                </Pressable>
                            </View>

                            {/* Main Button */}
                            <GradientButton
                                onPress={handleSignUp}
                                text="Create account"
                                style={styles.mainButtonMargin}
                            />

                            {/* Divider and Social Buttons (Retained from original code) */}
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>Or continue with</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialButtons}>
                                <Pressable style={styles.socialButton}>
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </Pressable>
                                <Pressable style={styles.socialButton}>
                                    <Text style={styles.socialButtonText}>Discord</Text>
                                </Pressable>
                                <Pressable style={styles.socialButton}>
                                    <Text style={styles.socialButtonText}>Discord+</Text>
                                </Pressable>
                            </View>

                            <Text style={styles.signinText}>
                                Already have an account?{' '}
                                <Text
                                    style={styles.signupLink}
                                    onPress={() => router.push('/signin')}
                                >
                                    Sign in
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
        backgroundColor: 'white', // Full white background
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16, // Padding consistent with Sign-In
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
    // --- Text and Form Container ---
    formContainer: {
        paddingTop: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 28, // Larger font size from Sign-In
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center', // Centered Title
    },
    cardSubtitle: {
        fontSize: 15, // Consistent font size
        color: '#666',
        marginBottom: 32,
        textAlign: 'center', // Centered Subtitle
    },
    form: {
        flex: 1,
        gap: 16, // Consistent spacing
    },
    // --- Input Styles (Consistent with Sign-In) ---
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: 56, // Consistent height
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 18,
        fontSize: 16,
        color: '#1a1a1a',
        height: '100%',
        borderWidth: 1, // 1px border
        borderColor: '#E0E0E0',
        borderRadius: 12, // 12px border radius
    },
    inputIconRight: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
    // --- Button Styles (Consistent Gradient Button) ---
    mainButtonMargin: {
        marginTop: 32,
        marginBottom: 16, // Use 16px spacing before the divider
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
    // --- Divider Styles (Consistent) ---
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 8,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        fontSize: 13,
        color: '#999',
    },
    // --- Social Buttons (Retained original styles for now) ---
    socialButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24, // Add space below social buttons
    },
    socialButton: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    socialButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    // --- Sign In Link (Consistent) ---
    signinText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16, // Added padding for the bottom
    },
    signupLink: {
        color: '#4A5FE8',
        fontWeight: '700',
    },
});