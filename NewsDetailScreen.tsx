import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function NewsDetailScreen({ route, navigation }: { route: any, navigation: any }) {
    // Get params from navigation, or use defaults for testing
    const {
        title = '쿠팡 동탄 물류센터서 30대 근로자 사망...사측 "지병 있어"',
        imageUrl = 'https://via.placeholder.com/300x200',
        category = '사회',
        time = '2시간 전'
    } = route.params || {};

    return (
        <SafeAreaContext style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('./assets/back.png')} style={styles.backIcon} resizeMode="contain" />
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

                <View style={styles.footerContainer}>
                    <Image
                        source={require('./assets/Blur.png')}
                        style={styles.footerBackground}
                    />
                    <View style={styles.footerOverlay}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => navigation.navigate('Survey')}
                        >
                            <Text style={styles.actionButtonText}>세대별 관점 분석을 보려면, 의견을 남겨주세요!</Text>
                        </TouchableOpacity>
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
});
