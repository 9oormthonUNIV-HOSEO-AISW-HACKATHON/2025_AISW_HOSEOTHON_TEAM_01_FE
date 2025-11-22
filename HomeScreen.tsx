import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: { navigation: any }) {
    const [activeTab, setActiveTab] = useState('home');
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
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>
                        <Text style={styles.highlight}>NEWNEW</Text>한 <Text style={styles.highlight}>시선</Text>으로{'\n'}
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

                {/* News Card 1 */}
                <View style={styles.newsCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.tagContainer}>
                            <View style={[styles.tag, { backgroundColor: '#E8F0FE' }]}>
                                <Text style={[styles.tagText, { color: '#1A73E8' }]}>경제</Text>
                            </View>
                            <Text style={styles.timeText}>1시간 전</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: '#FFF8E1' }]}>
                            <Text style={[styles.badgeText, { color: '#F57C00' }]}>👁 20대 관심도 높음</Text>
                        </View>
                    </View>

                    <View style={styles.imagePlaceholder}>
                        {/* Image component would go here */}
                        <Image
                            source={{ uri: 'https://via.placeholder.com/300x160' }}
                            style={styles.newsImage}
                            resizeMode="cover"
                        />
                        {/* Overlay text for demo purposes if image fails loading or just to show structure */}
                        <View style={styles.imageOverlay}>
                            <Text style={styles.overlayText}>비트코인 BTC</Text>
                            <Text style={styles.overlayPrice}>129,744,000.00</Text>
                            <Text style={styles.overlayChange}>▼ -152,000.00 -0.12%</Text>
                        </View>
                    </View>

                    <Text style={styles.newsTitle} numberOfLines={2}>
                        비트코인, 1억3000만원도 붕괴...블룸버그 "추가 하락 가능"
                    </Text>
                </View>

                {/* News Card 2 */}
                <View style={styles.newsCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.tagContainer}>
                            <View style={[styles.tag, { backgroundColor: '#E8F0FE' }]}>
                                <Text style={[styles.tagText, { color: '#1A73E8' }]}>사회</Text>
                            </View>
                            <Text style={styles.timeText}>2시간 전</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={[styles.badgeText, { color: '#FF6D00' }]}>⚡ 세대 의견 차이↑</Text>
                        </View>
                    </View>

                    <View style={[styles.imagePlaceholder, { backgroundColor: '#F5F5F5' }]}>
                        {/* Empty placeholder as requested */}
                    </View>

                    <Text style={styles.newsTitle} numberOfLines={2}>
                        쿠팡 동탄 물류센터서 30대 근로자 사망...사측 "지병 있어"
                    </Text>
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>

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
                <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('mypage')}>
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
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#F8F9FA',
    },
    logo: {
        width: 150,
        height: 50,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 80,
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
    newsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 12,
        color: '#888',
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    imagePlaceholder: {
        width: '100%',
        height: 160,
        backgroundColor: '#333',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    imageOverlay: {
        alignItems: 'center',
    },
    overlayText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    overlayPrice: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    overlayChange: {
        color: '#FF5252',
        fontSize: 14,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        lineHeight: 24,
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
});
