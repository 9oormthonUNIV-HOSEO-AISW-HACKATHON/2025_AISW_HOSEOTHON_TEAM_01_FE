import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SurveyScreen({ route, navigation }: { route: any, navigation: any }) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answer, setAnswer] = useState('');
    const totalQuestions = 5;
    const maxChars = 200;

    const questions = [
        "이 뉴스를 한 문장으로 요약하면 어떻게 생각하나요?",
        "이 뉴스에서 가장 중요한 부분은 무엇이라고 생각하나요?",
        "이 뉴스가 사회에 미치는 영향은 무엇일까요?",
        "이 뉴스에 대한 당신의 의견은 무엇인가요?",
        "이 뉴스와 관련하여 더 알고 싶은 것이 있나요?"
    ];

    const handleNext = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer('');
        } else {
            // Navigate to results screen
            navigation.navigate('SurveyResult', {
                title: route.params?.title || '쿠팡 동탄 물류센터서 30대 근로자 사망...사측 "지병 있어"'
            });
        }
    };

    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Image
                    source={require('./assets/splash-icon.png')}
                    style={styles.headerLogo}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>다음</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Question Container */}
                    <View style={styles.questionContainer}>
                        <View style={styles.questionBadge}>
                            <Text style={styles.questionBadgeText}>Q{currentQuestion}</Text>
                        </View>
                        <Text style={styles.questionText}>{questions[currentQuestion - 1]}</Text>
                    </View>

                    {/* Answer Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="답변을 작성해주세요."
                            placeholderTextColor="#C4C4C4"
                            multiline
                            value={answer}
                            onChangeText={setAnswer}
                            maxLength={maxChars}
                            textAlignVertical="top"
                        />
                        <Text style={styles.charCounter}>{answer.length}/{maxChars} 자</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F8F9FA',
    },
    backButton: {
        width: 40,
    },
    backButtonText: {
        fontSize: 24,
        color: '#333',
    },
    headerLogo: {
        width: 100,
        height: 30,
    },
    nextButton: {
        width: 40,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#2948FF',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 20,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#2948FF',
        borderRadius: 2,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    questionContainer: {
        backgroundColor: '#F0F5FF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        alignItems: 'flex-start',
    },
    questionBadge: {
        backgroundColor: '#5C7CFA',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 12,
    },
    questionBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        lineHeight: 26,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        minHeight: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    textInput: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        minHeight: 140,
        padding: 0,
    },
    charCounter: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
        marginTop: 10,
    },
});
