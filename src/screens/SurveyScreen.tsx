import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { newsService, SurveyQuestion } from '../services/news';

export default function SurveyScreen({ route, navigation }: { route: any, navigation: any }) {
    const { newsId, title } = route.params || {};
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const maxChars = 200;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const data = await newsService.getSurveyQuestions();
            setQuestions(data);
            // Initialize answers array
            setAnswers(new Array(data.length).fill(''));
        } catch (error) {
            console.error(error);
            alert('설문 질문을 불러오는데 실패했습니다.');
        }
    };

    const handleNext = async () => {
        if (!currentAnswer.trim()) {
            alert('답변을 입력해주세요.');
            return;
        }

        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = currentAnswer;
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentAnswer('');
        } else {
            // Submit
            try {
                await newsService.submitSurveyAnswers({
                    newsId: String(newsId),
                    q1Answer: newAnswers[0],
                    q2Answer: newAnswers[1],
                    q3Answer: newAnswers[2],
                    q4Answer: newAnswers[3],
                    q5Answer: currentAnswer
                });
                navigation.replace('SurveyResult', { newsId, title });
            } catch (error) {
                console.error(error);
                alert('답변 제출에 실패했습니다.');
            }
        }
    };

    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
    const currentQuestionNum = questions.length > 0 ? questions[currentQuestionIndex].surveyNum : 1;
    const currentQuestionText = questions.length > 0 ? questions[currentQuestionIndex].surveyQuestion : '질문을 불러오는 중입니다...';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../../assets/back.png')} style={styles.backIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Image
                    source={require('../../assets/splash-icon.png')}
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
                            <Text style={styles.questionBadgeText}>Q{currentQuestionNum}</Text>
                        </View>
                        <Text style={styles.questionText}>{currentQuestionText}</Text>
                    </View>

                    {/* Answer Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="답변을 작성해주세요."
                            placeholderTextColor="#C4C4C4"
                            multiline
                            value={currentAnswer}
                            onChangeText={setCurrentAnswer}
                            maxLength={maxChars}
                            textAlignVertical="top"
                        />
                        <Text style={styles.charCounter}>{currentAnswer.length}/{maxChars} 자</Text>
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
        padding: 5,
    },
    backIcon: {
        width: 24,
        height: 24,
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
