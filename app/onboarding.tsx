import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    ScrollView,
    Image,
    Platform, // Import Platform for platform-specific styles
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur'; // Import BlurView for the blurred container

const { width, height } = Dimensions.get("window");

// Add your images here
const onboardingData = [
    {
        image: require("../assets/onboarding/lotus.png"),
        title: "WELCOME TO BETTER\nPRODUCTIVITY",
        description:
            "It's time to have fun while you get things done. Join over 2 million others improving their life one task at a time",
        buttonText: "Continue",
        gradient: ["#4B8DAF", "#72BDE4", "#A8D5F2"],
    },
    {
        image: require("../assets/onboarding/powerups.png"),
        title: "TURN REAL TASKS\nINTO IN-GAME POWER-UPS",
        description:
            "Unlock features in the game by checking off your real life tasks",
        buttonText: "Continue",
        gradient: ["#8349C8", "#B55CEB", "#D98CFF"],
    },
    {
        image: require("../assets/onboarding/lions.png"),
        title: "STAY ON TRACK WITH\nTHE POWER OF FRIENDSHIP",
        description:
            "Keep your goals on track with help from friends. Support each other in life and in battle — you improve together",
        buttonText: "Get started",
        gradient: ["#4A6AB0", "#7987D2", "#A0B2EE"],
    },
];

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const insets = useSafeAreaInsets();

    const handleContinue = () => {
        if (currentIndex < onboardingData.length - 1) {
            const next = currentIndex + 1;
            setCurrentIndex(next);
            scrollViewRef.current?.scrollTo({ x: next * width, animated: true });
        } else {
            router.replace("/signin");
        }
    };

    const handleSkip = () => {
        router.replace("/signin");
    };

    const current = onboardingData[currentIndex];

    return (
        <LinearGradient
            colors={current.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                {/* --- MODIFICATION: Moved pagination to headerLeft --- */}
                <View style={styles.headerLeft}>
                    <BlurView intensity={12} tint="light" style={styles.paginationBlurContainer}>
                        <View style={styles.paginationDots}>
                            {onboardingData.map((_, i) => (
                                <View
                                    key={i}
                                    style={[styles.dot, currentIndex === i && styles.activeDot]}
                                />
                            ))}
                        </View>
                    </BlurView>
                </View>
                <View style={styles.headerCenter} />
                <Pressable onPress={handleSkip} style={styles.skipButton}>
                    <Text style={styles.skipText}>SKIP</Text>
                </Pressable>
            </View>

            {/* Scroll Area */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={styles.scrollView}
            >
                {onboardingData.map((item, index) => (
                    <View key={index} style={[styles.slide, { width }]}>
                        <View style={styles.slideContent}>
                            {/* IMAGE */}
                            <Image
                                source={item.image}
                                style={styles.image}
                                resizeMode="contain"
                            />

                            {/* Text Area */}
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>

                            {/* Button */}
                            <Pressable
                                onPress={handleContinue}
                                style={({ pressed }) => [
                                    styles.button,
                                    pressed && { opacity: 0.8 },
                                ]}
                            >
                                <Text style={styles.buttonText}>{item.buttonText}</Text>
                            </Pressable>

                            <Text style={styles.termsText}>
                                By continuing you accept GzaMe's Terms of service and Privacy
                                policy
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* --- MODIFICATION: Removed old pagination from here --- */}
            {/* <View style={[styles.pagination, { paddingBottom: insets.bottom + 24 }]}>
                {onboardingData.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, currentIndex === i && styles.activeDot]}
                    />
                ))}
            </View> */}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        flexDirection: "row",
        justifyContent: "space-between", // Keep space-between to align skip right
        paddingHorizontal: 16, // Adjusted padding to match slideContent
        alignItems: "center",
    },
    headerLeft: {
        // Now contains the blurred pagination
        // flex: 1, // Uncomment if you want headerLeft to take remaining space until center
        // justifyContent: 'center', // Align content of headerLeft
        // alignItems: 'flex-start', // Ensure blur container is left-aligned
    },
    headerCenter: { flex: 1 }, // This will push headerLeft and skipButton to the edges
    skipButton: { paddingHorizontal: 8, paddingVertical: 4 },
    skipText: {
        color: "white",
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    scrollView: { flex: 1 },

    slide: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    slideContent: {
        paddingHorizontal: 16,
        marginTop: 10,
        width: "100%",
    },

    image: {
        width: width * 0.8,
        height: width * 0.8,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center",
    },

    title: {
        fontSize: 26,
        textAlign: "center",
        fontWeight: "900",
        color: "white",
        lineHeight: 32,
        marginBottom: 16,
    },

    description: {
        fontSize: 14,
        textAlign: "center",
        color: "white",
        opacity: 0.9,
        marginBottom: 24,
        lineHeight: 20,
    },

    button: {
        backgroundColor: "rgba(255,160,15,1)",
        borderRadius: 16,
        paddingVertical: 16,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        // --- MODIFICATION: Adding button shadow ---
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 }, // Adjust height for a bottom shadow effect
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 8, // For a deeper shadow effect on Android
            },
        }),
    },

    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "700",
    },

    termsText: {
        fontSize: 11,
        color: "white",
        textAlign: "center",
        opacity: 0.8,
        marginTop: 4,
    },

    // --- MODIFICATION: New styles for top-left pagination ---
    paginationBlurContainer: {
        height: 38,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Important for blur and border-radius to work together
        paddingHorizontal: 10, // Give some internal padding for dots
    },
    paginationDots: {
        flexDirection: "row",
        gap: 10,
    },

    // Existing dot styles remain largely the same
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.4)",
    },

    activeDot: {
        width: 24,
        backgroundColor: "white",
    },
});