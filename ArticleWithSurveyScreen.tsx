import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 10;

export default function ArticleWithSurveyScreen({ route, navigation }: { route: any, navigation: any }) {
    const {
        title = '쿠팡 동탄 물류센터서 30대 근로자 사망...사측 "지병 있어"',
        imageUrl = 'https://via.placeholder.com/300x200',
        category = '사회',
        time = '2시간 전'
    } = route.params || {};

    const [activeIndex, setActiveIndex] = useState(1); // Start with 30s (index 1)

    const generationData = [
        {
            id: '20s',
            label: '20대',
            badgeColor: '#E8F0FE',
            textColor: '#2948FF',
            opinions: [
                '안전한 근무 환경이 최우선되어야 한다',
                '기업의 책임감 있는 태도가 필요하다',
                '정확한 진상 규명이 이루어져야 한다'
            ],
            hashtags: ['#안전제일', '#기업책임', '#진상규명']
        },
        {
            id: '30s',
            label: '30대',
            badgeColor: '#FFE8D6',
            textColor: '#FF8A3D',
            opinions: [
                '개인의 건강 문제와 과로 여부\n모두 조사해야 한다',
                '개인의 건강 문제와 과로 여부\n모두 조사해야 한다',
                '개인의 건강 문제와 과로 여부\n모두 조사해야 한다'
            ],
            hashtags: ['#심리적스트레스', '#근무환경피로', '#정확한조사필요']
        },
        {
            id: '40s',
            label: '40대',
            badgeColor: '#E6F7E9',
            textColor: '#00C851',
            opinions: [
                '제도적인 보완 장치가 시급하다',
                '노동자의 권익 보호가 강화되어야 한다',
                '재발 방지를 위한 대책이 필요하다'
            ],
            hashtags: ['#제도개선', '#권익보호', '#재발방지']
        },
        {
            id: '50s',
            label: '50대',
            badgeColor: '#F3E5F5',
            textColor: '#9C27B0',
            opinions: [
                '사회적 합의를 통한 해결이 필요하다',
                '서로 배려하는 노사 문화가 정착되어야 한다',
                '지속적인 관심과 감시가 필요하다'
            ],
            hashtags: ['#사회적합의', '#상생문화', '#지속적관심']
        },
        {
            id: '60s',
            label: '60대',
            badgeColor: '#FFF3E0',
            textColor: '#FF9800',
            opinions: [
                '건강 관리에 대한 개인의 책임도 중요하다',
                '기업과 근로자가 함께 노력해야 한다',
                '안타까운 사고에 깊은 애도를 표한다'
            ],
            hashtags: ['#건강관리', '#노사협력', '#애도']
        }
    ];

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const renderItem = ({ item }: { item: any }) => (
        <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
            {/* Generation Badge */}
            <View style={[styles.generationBadge, { backgroundColor: item.badgeColor }]}>
                <Text style={[styles.generationBadgeText, { color: item.textColor }]}>{item.label}</Text>
            </View>

            {/* Opinion Cards */}
            {item.opinions.map((opinion: string, index: number) => (
                <View key={index} style={styles.opinionCard}>
                    <Text style={styles.fireIcon}>🔥</Text>
                    <Text style={styles.opinionText}>{opinion}</Text>
                </View>
            ))}

            {/* Hashtags */}
            <View style={styles.hashtagContainer}>
                {item.hashtags.map((tag: string, index: number) => (
                    <View key={index} style={styles.hashtag}>
                        <Text style={styles.hashtagText}>{tag}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header from NewsDetailScreen */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('./assets/back.png')} style={styles.backIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Article Content from NewsDetailScreen */}
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.mainImage}
                    resizeMode="cover"
                />

                <Text style={styles.title}>{title}</Text>

                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        경기 화성시 쿠팡 물류센터에서 30대 남성 근로자가 숨져 경찰이 관련 경위를 조사하고 있다.
                        {'\n\n'}
                        22일 화성동탄경찰서 등에 따르면 전날 오후 10시 30분께 화성시 신동에 위치한 쿠팡 동탄1센터 내 식당에서 A씨가 갑자기 쓰러졌다. A씨는 심정지 상태로 인근 병원에 이송됐으나 숨졌다.
                        {'\n\n'}
                        계약직 근로자였던 A씨는 단순 포장 관련 업무를 맡고 있었던 것으로 전해졌다.
                        {'\n\n'}
                        경찰은 A씨의 시신에 대해 부검을 진행하며 사인을 밝힐 방침이다.
                        {'\n\n'}
                        쿠팡풀필먼트서비스 관계자는 "삼가 고인의 명복을 빌며 유족께 깊은 위로를 전한다"며 "고인은 지병이 있었던 것으로 확인된다"고 말했다. 이어 "최근 3개월간 고인의 주당 평균 근무일수는 4.3일, 주당 평균 근무시간은 40시간 미만이었다"며 "회사는 유족 지원에 최선을 다할 것"이라고 했다.
                    </Text>
                </View>

                {/* Divider */}
                <View style={styles.sectionDivider}>
                    <Text style={styles.dividerText}>📊 설문 결과 분석</Text>
                </View>

                {/* Survey Results from SurveyResultScreen */}
                <View style={styles.surveySection}>
                    <Text style={styles.sectionTitle}>세대별 관점 TOP3</Text>

                    {/* Carousel */}
                    <View style={{ height: 450 }}>
                        <FlatList
                            data={generationData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={CARD_WIDTH + SPACING * 2}
                            decelerationRate="fast"
                            contentContainerStyle={{
                                paddingHorizontal: (width - CARD_WIDTH) / 2 - SPACING,
                            }}
                            ItemSeparatorComponent={() => <View style={{ width: SPACING * 2 }} />}
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={viewabilityConfig}
                            initialScrollIndex={1}
                            getItemLayout={(data, index) => ({
                                length: CARD_WIDTH + SPACING * 2,
                                offset: (CARD_WIDTH + SPACING * 2) * index,
                                index,
                            })}
                        />
                    </View>

                    {/* Pagination Dots */}
                    <View style={styles.paginationContainer}>
                        {generationData.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === activeIndex && styles.activeDot
                                ]}
                            />
                        ))}
                    </View>

                    {/* Gradient Background */}
                    <LinearGradient
                        colors={['transparent', 'rgba(41, 72, 255, 0.05)', '#F8F9FA']}
                        style={styles.gradient}
                        pointerEvents="none"
                    />

                    {/* Overall Perspectives Section */}
                    <View style={styles.overallHeader}>
                        <Text style={styles.trophyIcon}>🏆</Text>
                        <Text style={styles.overallTitle}>세대 공통 관점</Text>
                    </View>

                    {/* Opinion Items */}
                    <View style={styles.commonOpinionContainer}>
                        <Text style={[styles.commonOpinionText, { textAlign: 'right' }]}>모두 "정확한 조사 필요"에 동의</Text>
                        <Text style={[styles.commonOpinionText, { textAlign: 'left' }]}>노동 환경 개선 필요성 공감</Text>
                        <Text style={[styles.commonOpinionText, { textAlign: 'right' }]}>사측 설명만으로 판단 불가</Text>
                    </View>
                </View>

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
    // Header Styles
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
        paddingBottom: 40,
    },
    // Article Styles
    mainImage: {
        width: width - 40,
        height: 200,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 20,
        lineHeight: 30,
        paddingHorizontal: 20,
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
        marginHorizontal: 20,
    },
    contentText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 26,
    },
    // Divider Styles
    sectionDivider: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F8F9FA',
        borderTopWidth: 8,
        borderTopColor: '#E8E8E8',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        marginBottom: 20,
    },
    dividerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2948FF',
        textAlign: 'center',
    },
    // Survey Section Styles
    surveySection: {
        // paddingHorizontal: 20, // Removed to allow full width for gradient
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
        marginBottom: 20,
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center',
    },
    generationBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 20,
    },
    generationBadgeText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    opinionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    fireIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    opinionText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        flex: 1,
        fontWeight: '500',
        textAlign: 'center',
    },
    hashtagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        justifyContent: 'center',
        gap: 8,
    },
    hashtag: {
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    hashtagText: {
        color: '#2948FF',
        fontSize: 13,
        fontWeight: '600',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2948FF',
        opacity: 0.2,
    },
    activeDot: {
        width: 24,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2948FF',
        opacity: 1,
    },
    overallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    trophyIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    overallTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    commonOpinionContainer: {
        paddingHorizontal: 40,
        width: '100%',
    },
    commonOpinionText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginBottom: 24,
        width: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 400,
    },
});
