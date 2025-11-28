import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { userService, ReportResponse } from '../services/user';

const { width } = Dimensions.get('window');

const CATEGORIES = ['전체', '정치', '경제', '사회', '생활', 'IT'];

interface ReportNewsItemProps {
    category: string;
    time: string;
    title: string;
    imageUrl: string;
    badgeText: string;
    badgeColor: string;
    badgeTextColor: string;
    onPress?: () => void;
}

const ReportNewsItem = ({ category, time, title, imageUrl, badgeText, badgeColor, badgeTextColor, onPress }: ReportNewsItemProps) => (
    <TouchableOpacity style={styles.newsItemContainer} onPress={onPress}>
        {/* Top Row: Category, Time, Badge */}
        <View style={styles.newsHeaderRow}>
            <View style={styles.categoryTimeContainer}>
                <View style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{category}</Text>
                </View>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                <Text style={[styles.badgeText, { color: badgeTextColor }]}>{badgeText}</Text>
            </View>
        </View>

        {/* Bottom Row: Image, Title */}
        <View style={styles.newsContentRow}>
            <Image source={{ uri: imageUrl }} style={styles.newsImage} resizeMode="cover" />
            <Text style={styles.newsTitle} numberOfLines={2}>{title}</Text>
        </View>
    </TouchableOpacity>
);

export default function ReportScreen({ navigation }: { navigation: any }) {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [reportData, setReportData] = useState<ReportResponse | null>(null);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const data = await userService.getReport();
            setReportData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const participation = reportData ? reportData.participation : 0;
    const mostCategoryCode = reportData ? reportData.mostCategory : '';
    const newsList = reportData ? reportData.newsList : [];

    // Map category code to Korean name
    const getCategoryName = (code: string) => {
        const categoryMap: { [key: string]: string } = {
            'POLITICS': '정치',
            'ECONOMY': '경제',
            'SOCIETY': '사회',
            'LIFE': '생활',
            'IT': 'IT',
        };
        return categoryMap[code] || code;
    };

    const mostCategory = getCategoryName(mostCategoryCode);

    const filteredNews = selectedCategory === '전체'
        ? newsList
        : newsList.filter(news => news.category === selectedCategory);

    return (
        <SafeAreaView style={styles.container}>
            {/* Summary Section - Fixed */}
            <View style={styles.summarySection}>
                <Text style={styles.summaryText}>
                    총 <Text style={styles.highlightText}>{participation}개</Text>의 뉴스에 참여했어요
                </Text>
                <Text style={styles.summaryText}>
                    가장 많이 참여한 분야는 '<Text style={styles.highlightText}>{mostCategory}</Text>'예요
                </Text>
                <View style={styles.divider} />
            </View>

            {/* Category Tabs - Fixed */}
            <View style={styles.categoryBar}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.categoryItem, selectedCategory === cat && styles.categoryItemActive]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.categoryTabText, selectedCategory === cat && styles.categoryTabTextActive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Scrollable News List */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* News List */}
                <View style={styles.newsList}>
                    {filteredNews.map((news) => (
                        <ReportNewsItem
                            key={news.newsId}
                            category={news.category}
                            time={news.latestTime}
                            title={news.title}
                            imageUrl={news.thumbnailUrl}
                            badgeText="참여 완료" // Mock badge text as API doesn't provide it
                            badgeColor="#E8F0FE"
                            badgeTextColor="#1A73E8"
                            onPress={() => navigation.navigate('NewsDetail', {
                                newsId: news.newsId,
                                title: news.title,
                                imageUrl: news.thumbnailUrl,
                                category: news.category,
                                time: news.latestTime,
                                content: news.content
                            })}
                        />
                    ))}
                </View>

                <View style={{ height: 20 }} />
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
    },
    logo: {
        width: 120,
        height: 40,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    summarySection: {
        paddingHorizontal: 20,
        marginTop: -10,
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 8,
        lineHeight: 28,
    },
    highlightText: {
        color: '#2948FF',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginTop: 20,
        marginBottom: 10,
    },
    categoryBar: {
        marginBottom: 20,
    },
    categoryScroll: {
        paddingHorizontal: 20,
    },
    categoryItem: {
        marginRight: 20,
        paddingVertical: 8,
    },
    categoryItemActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#2948FF',
    },
    categoryTabText: {
        fontSize: 16,
        color: '#888',
    },
    categoryTabTextActive: {
        color: '#2948FF',
        fontWeight: 'bold',
    },
    newsList: {
        paddingHorizontal: 20,
    },
    newsItemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    newsHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryTag: {
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    categoryText: {
        color: '#1A73E8',
        fontSize: 12,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 12,
        color: '#888',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    newsContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newsImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: '#DDD',
    },
    newsTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
        lineHeight: 22,
    },
});
