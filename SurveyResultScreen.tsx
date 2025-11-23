import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { newsService, SurveyStatisticsResponse } from './services/news';

export default function SurveyResultScreen({ route, navigation }: { route: any, navigation: any }) {
    const { newsId, title } = route.params || {};
    const [resultData, setResultData] = useState<SurveyStatisticsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (newsId) {
            fetchResult();
        }
    }, [newsId]);

    useEffect(() => {
        // Check if we have valid generation data (commonAspect can be null as per service policy)
        const hasValidGenerationData = resultData?.generationAspectList && resultData.generationAspectList.length > 0;

        // Only poll if we don't have generation data
        const needsPolling = !hasValidGenerationData;

        if (needsPolling && newsId) {
            console.log('[SurveyResult] Polling... Has generation:', hasValidGenerationData);
            const interval = setInterval(() => {
                fetchResult();
            }, 1000); // Poll every 1 second

            return () => clearInterval(interval);
        } else if (!needsPolling) {
            console.log('[SurveyResult] Generation data complete, stopping poll');
        }
    }, [resultData, newsId]);

    const fetchResult = async () => {
        try {
            const data = await newsService.getSurveyStatistics(newsId);
            setResultData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getGenerationLabel = (gen: string) => {
        const labels: { [key: string]: string } = {
            'GEN_Z': 'Z세대',
            'MILLENNIAL': '밀레니얼',
            'GEN_X': 'X세대',
            'BABY_BOOMER': '베이비부머',
        };
        return labels[gen] || gen;
    };

    const getGenerationColor = (index: number) => {
        const colors = [
            { bg: '#E8F0FE', text: '#2948FF' },
            { bg: '#FFE8D6', text: '#FF8A3D' },
            { bg: '#E6F7E9', text: '#00C851' },
            { bg: '#F3E5F5', text: '#9C27B0' },
        ];
        return colors[index % colors.length];
    };

    // Check if data is empty
    const hasCommonAspect = resultData?.commonAspect && resultData.commonAspect.trim().length > 0;
    const hasGenerationData = resultData?.generationAspectList && resultData.generationAspectList.length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./assets/splash-icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* News Title */}
                <Text style={styles.newsTitle}>{title || '뉴스 제목'}</Text>

                {/* Common Aspect Section */}
                <View style={styles.commonSection}>
                    <View style={styles.commonHeader}>
                        <Text style={styles.trophyIcon}>🏆</Text>
                        <Text style={styles.commonTitle}>세대 공통 관점</Text>
                    </View>
                    <View style={styles.commonCard}>
                        {hasCommonAspect ? (
                            <>
                                <Text style={styles.commonAspect}>{resultData.commonAspect}</Text>
                                <Text style={styles.commonReason}>{resultData.aspectReason || ''}</Text>
                            </>
                        ) : (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyStateIcon}>⏳</Text>
                                <Text style={styles.emptyStateText}>데이터 분석 중입니다...</Text>
                                <Text style={styles.emptyStateSubtext}>잠시만 기다려주세요</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Generation Aspects Section */}
                <Text style={styles.sectionTitle}>세대별 관점</Text>

                {hasGenerationData ? (
                    resultData.generationAspectList.map((genAspect, index) => {
                        const colors = getGenerationColor(index);
                        return (
                            <View key={genAspect.generation} style={styles.generationCard}>
                                <View style={[styles.generationBadge, { backgroundColor: colors.bg }]}>
                                    <Text style={[styles.generationBadgeText, { color: colors.text }]}>
                                        {getGenerationLabel(genAspect.generation)}
                                    </Text>
                                </View>

                                {/* First Aspect */}
                                <View style={styles.aspectItem}>
                                    <Text style={styles.aspectRank}>1순위</Text>
                                    <Text style={styles.aspectTitle}>{genAspect.firstAspect}</Text>
                                    <Text style={styles.aspectReason}>{genAspect.firstAspectReason}</Text>
                                </View>

                                {/* Second Aspect */}
                                <View style={styles.aspectItem}>
                                    <Text style={styles.aspectRank}>2순위</Text>
                                    <Text style={styles.aspectTitle}>{genAspect.secondAspect}</Text>
                                    <Text style={styles.aspectReason}>{genAspect.secondAspectReason}</Text>
                                </View>

                                {/* Third Aspect */}
                                <View style={styles.aspectItem}>
                                    <Text style={styles.aspectRank}>3순위</Text>
                                    <Text style={styles.aspectTitle}>{genAspect.thirdAspect}</Text>
                                    <Text style={styles.aspectReason}>{genAspect.thirdAspectReason}</Text>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyStateIcon}>⏳</Text>
                        <Text style={styles.emptyStateText}>데이터 분석 중입니다...</Text>
                        <Text style={styles.emptyStateSubtext}>잠시만 기다려주세요</Text>
                    </View>
                )}

                {/* Gradient Background */}
                <LinearGradient
                    colors={['transparent', 'rgba(41, 72, 255, 0.1)']}
                    style={styles.gradient}
                    pointerEvents="none"
                />

                {/* Return to Main Button */}
                <TouchableOpacity
                    style={styles.returnButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.returnButtonText}>돌아가기</Text>
                </TouchableOpacity>

                <View style={{ height: 50 }} />
            </ScrollView>

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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 40,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    newsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        lineHeight: 30,
        marginBottom: 30,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    commonSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    commonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    trophyIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    commonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    commonCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    commonAspect: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 10,
        lineHeight: 24,
    },
    commonReason: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    generationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    generationBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    generationBadgeText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    aspectItem: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    aspectRank: {
        fontSize: 12,
        color: '#2948FF',
        fontWeight: 'bold',
        marginBottom: 6,
    },
    aspectTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 6,
        lineHeight: 22,
    },
    aspectReason: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
    },
    returnButton: {
        backgroundColor: '#2948FF',
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    returnButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 40,
        marginHorizontal: 20,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});
