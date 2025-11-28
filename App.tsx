import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './src/screens/StartScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import NewsDetailScreen from './src/screens/NewsDetailScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import SurveyResultScreen from './src/screens/SurveyResultScreen';
import ArticleWithSurveyScreen from './src/screens/ArticleWithSurveyScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurveyResult"
          component={SurveyResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArticleWithSurvey"
          component={ArticleWithSurveyScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
