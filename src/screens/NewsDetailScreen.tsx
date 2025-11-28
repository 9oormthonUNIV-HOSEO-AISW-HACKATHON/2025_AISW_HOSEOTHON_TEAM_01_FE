import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context';
import { newsService } from '../services/news';

const { width } = Dimensions.get('window');

export default function NewsDetailScreen({ route, navigation }: { route: any, navigation: any }) {
    // Get params from navigation
    const {
        newsId,
        title = '뉴스 제목',
        imageUrl = 'https://via.placeholder.com/300x200',
        category = '사회',
        time = '2시간 전',
        content: initialContent
    } = route.params || {};

    const [content, setContent] = useState(initialContent || '');
    const [reportBlur, setReportBlur] = useState(false);
    const [hasParticipated, setHasParticipated] = useState(false);

    useEffect(() => {
        if (newsId) {
            if (!initialContent) {
                fetchDetail();
            }
            checkParticipation();
        }
    }, [newsId]);

    const fetchDetail = async () => {
        try {
            const response = await newsService.getNewsDetail(newsId);
            setContent(response.content || '');
            setReportBlur(response.reportBlur);
        } catch (error) {
            console.error(error);
        }
    };

    const checkParticipation = async () => {
        try {
            const participated = await newsService.checkSurveyParticipation(newsId);
            setHasParticipated(participated);
        } catch (error) {
            console.error('Error checking survey participation:', error);
        }
    };

    return (
        <SafeAreaContext style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../../assets/back.png')} style={styles.backIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.mainImage}
                    resizeMode="cover"
                />

                <Text style={styles.title}>{title}</Text>

                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        {content || '본문 내용을 불러오는 중입니다...'}
                    </Text>
                </View>

                <View style={styles.footerContainer}>
                    <Image
                        source={require('../../assets/Blur.png')}
                        style={styles.footerBackground}
                    />
                    <View style={styles.footerOverlay}>
                        {reportBlur ? (
                            <View style={styles.blurMessage}>
                                <Text style={styles.blurMessageText}>설문을 먼저 완료해주세요!</Text>
                            </View>
                        ) : hasParticipated ? (
                            <TouchableOpacity
                                style={styles.participatedButton}
                                onPress={() => navigation.navigate('SurveyResult', { newsId, title })}
                            >
                                <Text style={styles.participatedButtonText}>✅ 이미 참여한 설문입니다 - 결과 보기</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => navigation.navigate('Survey', { newsId })}
                            >
                                <Text style={styles.actionButtonText}>세대별 관점 분석을 보려면, 의견을 남겨주세요!</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <StatusBar style="dark" />
        </SafeAreaContext>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F8F9FA',
    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 20,
        lineHeight: 30,
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 30,
    },
    contentText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 26,
    },
    footerContainer: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        marginTop: 10,
    },
    footerBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    footerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 20,
    },
    actionButton: {
        backgroundColor: '#2948FF',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    blurMessage: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    blurMessageText: {
        color: '#888',
        fontSize: 13,
        fontWeight: 'bold',
    },
    participatedMessage: {
        backgroundColor: '#E8F5E9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    participatedMessageText: {
        color: '#2E7D32',
        fontSize: 13,
        fontWeight: 'bold',
    },
    participatedButton: {
        backgroundColor: '#E8F5E9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2E7D32',
    },
    participatedButtonText: {
        color: '#2E7D32',
        fontSize: 13,
        fontWeight: 'bold',
    },
});
