import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useEffect, useCallback, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function StartScreen({ navigation }: { navigation: any }) {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // 스플래시 화면이 자동으로 숨겨지지 않도록 설정
                await SplashScreen.preventAutoHideAsync();

                // 여기서 필요한 초기화 작업 수행
                // 예: 폰트 로딩, 데이터 가져오기 등
                await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 대기

                // 초기화 완료
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // 앱이 준비되면 스플래시 화면 숨기기
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <ImageBackground
            source={require('../../assets/Splash screen.png')}
            style={styles.container}
            onLayout={onLayoutRootView}
            resizeMode="cover"
        >
            <View style={styles.contentContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/splash-icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.buttonText}>시작하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginText}>
                            이미 계정이 있나요? <Text style={styles.loginLinkText}>로그인</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 80,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 200,
        height: 200,
    },
    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    loginLink: {
        padding: 10,
    },
    loginText: {
        fontSize: 14,
        color: '#666666',
    },
    loginLinkText: {
        color: '#0055FF',
        fontWeight: 'bold',
    },
});
