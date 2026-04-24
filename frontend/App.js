import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 우리가 만든 화면(Screen)들 불러오기
import DiaryListScreen from './src/screens/DiaryListScreen';
// 아직 상세화면 파일을 안 만드셨다면, 아래 줄은 일단 주석 처리하거나 파일을 미리 만들어두세요!
// import DiaryDetailScreen from './src/screens/DiaryDetailScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Navigator: 화면 이동을 관리하는 전체 틀 */}
      <Stack.Navigator initialRouteName="DiaryList">

        {/* 1. 목록 화면 등록 */}
        <Stack.Screen
          name="DiaryList"
          component={DiaryListScreen}
          options={{ title: '나의 일기 목록' }} // 상단바 제목
        />

        {/* 2. 상세 화면 등록 (
        
        나중에 만들 파일) */}
        {/* <Stack.Screen 
          name="DiaryDetail" 
          component={DiaryDetailScreen} 
          options={{ title: '일기 상세' }}
        /> 
        */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}