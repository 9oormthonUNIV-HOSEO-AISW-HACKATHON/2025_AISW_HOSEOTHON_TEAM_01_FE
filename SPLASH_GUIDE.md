# 스플래시 화면 설정 가이드

## 📱 현재 설정 상태

### ✅ 완료된 작업
1. `expo-splash-screen` 패키지 설치
2. `app.json`에서 스플래시 이미지 및 배경색 설정
3. `App.tsx`에서 프로그래밍 방식으로 스플래시 제어

---

## 🎨 스플래시 화면 커스터마이징

### 1. **이미지 변경**

#### 스플래시 이미지 만들기
- **권장 크기**: 1242 x 2436px (iPhone X 기준)
- **최신 기기**: 1284 x 2778px
- **형식**: PNG (투명 배경 가능)

#### 이미지 교체
1. 새 이미지를 `assets/splash-icon.png`로 저장
2. 또는 다른 경로 사용 시 `app.json` 수정:

```json
"splash": {
  "image": "./assets/my-custom-splash.png"
}
```

### 2. **배경색 변경**

`app.json`에서 `backgroundColor` 수정:

```json
"splash": {
  "backgroundColor": "#4A90E2"  // 원하는 색상 코드
}
```

**추천 색상**:
- 브랜드 컬러 사용
- 앱 메인 화면과 어울리는 색
- 예: `#4A90E2` (파란색), `#FF6B6B` (빨간색), `#000000` (검은색)

### 3. **이미지 크기 조절 모드**

```json
"splash": {
  "resizeMode": "cover"  // contain | cover | native
}
```

- **contain**: 이미지가 화면에 맞게 축소 (여백 생김) ← 기본값
- **cover**: 이미지가 화면을 꽉 채움 (잘릴 수 있음) ← 현재 설정
- **native**: 플랫폼 기본 방식

---

## 🚀 프로그래밍 방식 제어

### 현재 구현된 기능

`App.tsx`에서 스플래시 화면을 제어합니다:

```typescript
// 스플래시 화면 자동 숨김 방지
SplashScreen.preventAutoHideAsync();

// 초기화 작업 후 수동으로 숨김
await SplashScreen.hideAsync();
```

### 스플래시 표시 시간 조절

`App.tsx`의 `prepare()` 함수에서 시간 조절:

```typescript
// 2초 동안 스플래시 표시
await new Promise(resolve => setTimeout(resolve, 2000));

// 3초로 변경하려면
await new Promise(resolve => setTimeout(resolve, 3000));
```

### 실제 사용 예시

```typescript
async function prepare() {
  try {
    // 폰트 로딩
    await Font.loadAsync({
      'custom-font': require('./assets/fonts/custom-font.ttf'),
    });
    
    // API에서 데이터 가져오기
    await fetchInitialData();
    
    // 이미지 프리로드
    await Asset.loadAsync([
      require('./assets/logo.png'),
      require('./assets/background.jpg'),
    ]);
    
  } catch (e) {
    console.warn(e);
  } finally {
    setAppIsReady(true);
  }
}
```

---

## 🎯 스플래시 화면 디자인 팁

### 1. **심플하게**
- 로고 + 배경색만으로도 충분
- 너무 많은 요소는 피하기

### 2. **브랜드 일관성**
- 앱 아이콘과 비슷한 디자인
- 메인 화면과 자연스럽게 연결

### 3. **로딩 표시**
- 스피너나 프로그레스 바 추가 가능
- 사용자에게 앱이 로딩 중임을 알림

### 4. **플랫폼별 최적화**

#### iOS
```json
"ios": {
  "splash": {
    "image": "./assets/splash-ios.png",
    "backgroundColor": "#4A90E2"
  }
}
```

#### Android
```json
"android": {
  "splash": {
    "image": "./assets/splash-android.png",
    "backgroundColor": "#4A90E2",
    "resizeMode": "cover"
  }
}
```

---

## 🛠️ 고급 기능

### 1. **애니메이션 스플래시**

```bash
npm install react-native-animated-splash-screen
```

### 2. **Lottie 애니메이션**

```bash
npm install lottie-react-native
```

```typescript
import LottieView from 'lottie-react-native';

<LottieView
  source={require('./assets/splash-animation.json')}
  autoPlay
  loop={false}
/>
```

---

## 📋 체크리스트

- [x] `expo-splash-screen` 설치
- [x] `app.json`에서 배경색 설정
- [x] `app.json`에서 resizeMode 설정
- [x] `App.tsx`에서 스플래시 제어 구현
- [ ] 커스텀 스플래시 이미지 제작
- [ ] 실제 이미지로 교체
- [ ] 로딩 시간 최적화

---

## 🔄 변경 사항 적용

스플래시 화면 설정을 변경한 후:

1. **개발 서버 재시작**
   ```bash
   # Ctrl+C로 중지 후
   npm start
   ```

2. **앱 새로고침**
   - Expo Go 앱에서 앱을 다시 로드

3. **캐시 클리어** (필요시)
   ```bash
   npx expo start -c
   ```

---

## 💡 참고 자료

- [Expo Splash Screen 공식 문서](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [Expo App Icon & Splash 가이드](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)
