import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewsCard from './components/NewsCard';
import ReportScreen from './ReportScreen';
import { newsService, NewsItem } from './services/news';

const { width } = Dimensions.get('window');

const CATEGORIES = ['전체', '정치', '경제', '사회', '생활', 'IT'];

export default function HomeScreen({ navigation }: { navigation: any }) {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await newsService.getNewsList();
            console.log('[HomeScreen] Total news count:', response.newsList.length);
            console.log('response', response);

            // Log thumbnail URLs
            response.newsList.forEach((news, index) => {
                console.log(`[HomeScreen] News ${index + 1} thumbnail:`, news.thumbnailUrl || 'NO URL');
            });

            setNewsList(response.newsList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredNews = selectedCategory === '전체'
        ? newsList
        : newsList.filter(news => news.category === selectedCategory);

    const renderHomeContent = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>
                    <Text style={styles.highlight}>NEWNEW한</Text> <Text style={styles.highlight}>시선</Text>으로{'\n'}
                    오늘의 뉴스를 만나보세요!
                </Text>
                <Text style={styles.welcomeSubtitle}>
                    "세대별 뉴스 해석 차이를 한눈에!"
                </Text>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>오늘의 NEW Pick</Text>
                <View style={styles.dot} />
            </View>

            {newsList.map((news) => (
                <NewsCard
                    key={news.newsId}
                    category={news.category}
                    time={news.latestTime}
                    title={news.title}
                    imageUrl={news.thumbnailUrl}
                    onPress={() => navigation.navigate('NewsDetail', {
                        newsId: news.newsId,
                        title: news.title,
                        imageUrl: news.thumbnailUrl,
                        category: news.category,
                        time: news.latestTime
                    })}
                />
            ))}

            <View style={{ height: 20 }} />
        </ScrollView>
    );

    const renderNewsContent = () => (
        <View style={{ flex: 1 }}>
            {/* Category Bar */}
            <View style={styles.categoryBar}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.categoryItem, selectedCategory === cat && styles.categoryItemActive]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>오늘의 {selectedCategory} Pick</Text>
                </View>

                {/* Featured News */}
                {filteredNews.length > 0 && (
                    <NewsCard
                        category={filteredNews[0].category}
                        time={filteredNews[0].latestTime}
                        title={filteredNews[0].title}
                        imageUrl={filteredNews[0].thumbnailUrl}
                        onPress={() => navigation.navigate('NewsDetail', {
                            newsId: filteredNews[0].newsId,
                            title: filteredNews[0].title,
                            imageUrl: filteredNews[0].thumbnailUrl,
                            category: filteredNews[0].category,
                            time: filteredNews[0].latestTime
                        })}
                    />
                )}

                <View style={styles.divider} />
                {/* List News */}
                {filteredNews.slice(1).map((news) => (
                    <NewsCard
                        key={news.newsId}
                        layout="horizontal"
                        category={news.category}
                        time={news.latestTime}
                        title={news.title}
                        imageUrl={news.thumbnailUrl}
                        onPress={() => navigation.navigate('NewsDetail', {
                            newsId: news.newsId,
                            title: news.title,
                            imageUrl: news.thumbnailUrl,
                            category: news.category,
                            time: news.latestTime
                        })}
                    />
                ))}

                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('./assets/splash-icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.contentContainer}>
                {activeTab === 'home' ? renderHomeContent() :
                    activeTab === 'news' ? renderNewsContent() :
                        activeTab === 'report' ? <ReportScreen navigation={navigation} /> :
                            <View style={styles.centerContent}><Text>준비 중입니다</Text></View>}
            </View>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
                    <Image
                        source={activeTab === 'home' ? require('./assets/homeicon.png') : require('./assets/n_home_cion.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>홈</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('news')}>
                    <Image
                        source={activeTab === 'news' ? require('./assets/news_icon.png') : require('./assets/n_news_icon.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={[styles.navText, activeTab === 'news' && styles.activeNavText]}>뉴스</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('report')}>
                    <Image
                        source={activeTab === 'report' ? require('./assets/report_icon.png') : require('./assets/n_report_icon.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={[styles.navText, activeTab === 'report' && styles.activeNavText]}>리포트</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyPage')}>
                    <Image
                        source={activeTab === 'mypage' ? require('./assets/mypage_icon.png') : require('./assets/n_mypage_icon.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={[styles.navText, activeTab === 'mypage' && styles.activeNavText]}>MY</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="dark" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    contentContainer: {
        flex: 1,
        marginBottom: 80, // Space for bottom nav
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 0,
        backgroundColor: '#F8F9FA',
    },
    logo: {
        width: 150,
        height: 50,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    welcomeSection: {
        marginTop: 20,
        marginBottom: 30,
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        lineHeight: 32,
    },
    highlight: {
        color: '#2948FF',
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 8,
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#2948FF',
        marginLeft: 4,
        marginTop: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingBottom: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 10,
        marginTop: 4,
        color: '#C4C4C4',
    },
    activeNavText: {
        color: '#001B94',
        fontWeight: 'bold',
    },
    navIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    // Category Bar Styles
    categoryBar: {
        backgroundColor: '#F8F9FA',
        paddingVertical: 10,
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
    categoryText: {
        fontSize: 16,
        color: '#888',
    },
    categoryTextActive: {
        color: '#2948FF',
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 20,
    },
});
