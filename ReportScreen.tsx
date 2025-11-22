import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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
}

const ReportNewsItem = ({ category, time, title, imageUrl, badgeText, badgeColor, badgeTextColor }: ReportNewsItemProps) => (
    <View style={styles.newsItemContainer}>
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
    </View>
);

export default function ReportScreen() {
    const [selectedCategory, setSelectedCategory] = useState('전체');

    return (
        <SafeAreaView style={styles.container}>
            {/* Summary Section - Fixed */}
            <View style={styles.summarySection}>
                <Text style={styles.summaryText}>
                    총 <Text style={styles.highlightText}>7개</Text>의 뉴스에 참여했어요
                </Text>
                <Text style={styles.summaryText}>
                    가장 많이 참여한 분야는 '<Text style={styles.highlightText}>사회</Text>'예요
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
                    <ReportNewsItem
                        category="사회"
                        time="1시간 전"
                        title="'구더기 방치' 부사관 아내, 끝내 사망.. 유족 &quot;가족들 못오게 했다&quot;"
                        imageUrl="https://via.placeholder.com/80"
                        badgeText="🤝 세대 의견 차이↓"
                        badgeColor="#FFF8E1"
                        badgeTextColor="#F57C00"
                    />
                    <ReportNewsItem
                        category="사회"
                        time="1시간 전"
                        title='"물티슈 판매 전면 금지" 정부 선포... 내년부터 영국 전역서 시행'
                        imageUrl="https://via.placeholder.com/80"
                        badgeText="📌 관심도 높음"
                        badgeColor="#F3E5F5"
                        badgeTextColor="#7B1FA2"
                    />
                    <ReportNewsItem
                        category="사회"
                        time="1시간 전"
                        title='쿠팡 동탄 물류센터서 30대 근로자 사망...사측 "지병 있어"'
                        imageUrl="https://via.placeholder.com/80"
                        badgeText="⚡ 세대 의견 차이↑"
                        badgeColor="#FFF3E0"
                        badgeTextColor="#FF6D00"
                    />
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
