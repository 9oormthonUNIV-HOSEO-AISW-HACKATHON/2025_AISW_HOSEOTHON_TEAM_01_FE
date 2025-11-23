import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userService, MyPageResponse } from './services/user';
import { authService } from './services/auth';

export default function MyPageScreen({ navigation }: { navigation: any }) {
    const [userInfo, setUserInfo] = useState<MyPageResponse | null>(null);

    useEffect(() => {
        fetchMyPage();
    }, []);

    const fetchMyPage = async () => {
        try {
            const data = await userService.getMyPage();
            setUserInfo(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error(error);
            alert('로그아웃에 실패했습니다.');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image
                        source={require('./assets/back.png')}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Image
                    source={require('./assets/splash-icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Section */}
                <Text style={styles.sectionTitle}>내 프로필</Text>

                <View style={styles.profileCard}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require('./assets/apeach.png')}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.generationBadge}>
                            <Text style={styles.generationBadgeText}>{userInfo?.generation || '세대'}</Text>
                        </View>
                        <Text style={styles.profileName}>{userInfo?.nickName || '닉네임'}</Text>
                        <Text style={styles.profileEmail}>{userInfo?.id || '아이디'}</Text>
                    </View>
                </View>

                {/* Menu Section */}
                <Text style={styles.sectionTitle}>내 계정</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>도움말</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Text style={styles.menuText}>로그아웃</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>계정 탈퇴</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
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
    logo: {
        width: 150,
        height: 50,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        marginTop: 10,
    },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    profileImageContainer: {
        marginRight: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#E0E0E0',
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    generationBadge: {
        backgroundColor: '#FFE8D6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    generationBadgeText: {
        color: '#FF8A3D',
        fontSize: 12,
        fontWeight: 'bold',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: '#888',
    },
    menuItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});
