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
import { ChevronLeft, X } from 'lucide-react-native'; // Added X for the clear button
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
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </LinearGradient>
    </Pressable>
);

export default function ForgotPasswordScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        console.log('Reset password for', email);
        // Typically, you would navigate to a confirmation screen here
        // router.push('/reset-password-confirmation');
    };

    return (
        // Changed outer LinearGradient to a View with white background
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                {/* Back Button with Blur Container (Consistent UI) */}
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
                        {/* Title and Subtitle - Centered and Styled */}
                        <Text style={styles.cardTitle}>Reset password</Text>
                        <Text style={styles.cardSubtitle}>
                            Enter your email and we&apos;ll send you a link to reset your password.
                        </Text>

                        <View style={styles.form}>
                            {/* Email Input Group (Consistent Style) */}
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

                            {/* Main Button (Consistent Gradient Button) */}
                            <GradientButton
                                onPress={handleResetPassword}
                                text="Send Reset Link"
                                style={styles.mainButtonMargin}
                            />

                            {/* Back to Sign In Link (Consistent Style) */}
                            <Pressable onPress={() => router.back()}>
                                <Text style={styles.backToSignIn}>Back to sign in</Text>
                            </Pressable>
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
    // --- Form Styles (Consistent) ---
    formContainer: {
        paddingTop: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 28, // Consistent large title size
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardSubtitle: {
        fontSize: 15, // Consistent subtitle size
        color: '#666',
        marginBottom: 32, // Consistent spacing before form
        textAlign: 'center',
        lineHeight: 22, // Improved readability
    },
    form: {
        flex: 1,
        gap: 16, // Consistent spacing between input and link
    },
    // --- Input Styles (Consistent) ---
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: 56, // Consistent height
    },
    input: {
        flex: 1,
        paddingVertical: 18,
        fontSize: 16,
        color: '#1a1a1a',
        height: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
    },
    inputIconRight: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
    // --- Button Styles (Consistent Gradient Button) ---
    mainButtonMargin: {
        marginTop: 32, // Large gap before the main action button
        marginBottom: 16, // Consistent spacing after the button
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
    // --- Back to Sign In Link (Consistent) ---
    backToSignIn: {
        fontSize: 14,
        color: '#4A5FE8',
        textAlign: 'center',
        fontWeight: '700', // Made bold for consistency with other links
    },
});