import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen({ navigation }: { navigation: any }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [birthdate, setBirthdate] = useState('');

    // 생년월일 포맷팅 함수 (YYYY-MM-DD)
    const formatBirthdate = (text: string) => {
        // 숫자만 추출
        const numbers = text.replace(/[^\d]/g, '');

        // 최대 8자리 숫자만 허용
        const limitedNumbers = numbers.slice(0, 8);

        // 포맷팅
        let formatted = limitedNumbers;
        if (limitedNumbers.length >= 4) {
            formatted = limitedNumbers.slice(0, 4);
            if (limitedNumbers.length >= 6) {
                formatted += '-' + limitedNumbers.slice(4, 6) + '-' + limitedNumbers.slice(6, 8);
            } else if (limitedNumbers.length > 4) {
                formatted += '-' + limitedNumbers.slice(4);
            }
        }

        setBirthdate(formatted);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Image source={require('./assets/back.png')} style={styles.backIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            간단한 가입으로 <Text style={styles.highlight}>세대별 관점</Text>을 경험하세요
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>ID</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="아이디를 입력해주세요"
                                placeholderTextColor="#C4C4C4"
                                value={id}
                                onChangeText={setId}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>비밀번호</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호를 입력해주세요"
                                placeholderTextColor="#C4C4C4"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>닉네임</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="닉네임을 입력해주세요"
                                placeholderTextColor="#C4C4C4"
                                value={nickname}
                                onChangeText={setNickname}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>생년월일</Text>
                            <Text style={styles.subLabel}>생년월일을 8글자로 입력해 주세요</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#C4C4C4"
                                value={birthdate}
                                onChangeText={formatBirthdate}
                                keyboardType="numeric"
                                maxLength={10}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>가입하기</Text>
                        </TouchableOpacity>
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
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    backButtonText: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    titleContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    highlight: {
        color: '#0055FF',
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subLabel: {
        fontSize: 13,
        color: '#888',
        marginBottom: 8,
        marginTop: -4,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
        marginBottom: 30,
    },
    footer: {
        marginTop: 20,
    },
    signupButton: {
        backgroundColor: '#2948FF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
