import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// 1단계에서 만든 비서(api) 소환! 
// 경로(../services/api)는 본인의 폴더 구조에 맞게 조절하세요.
import api from '../../services/api';

export default function HomeScreen() {
  // [1] 데이터를 담을 바구니 만들기 (초기값은 빈 배열 [])
  const [diaries, setDiaries] = useState([]);

  // [2] 화면이 로딩되자마자 실행되는 함수
  useEffect(() => {
    fetchData();
  }, []);

  // [3] 실제 비서(api) 시켜서 장고한테 데이터 받아오기
  const fetchData = async () => {
    try {
      // 주소 생략! baseURL 뒤의 경로만 적으면 됨
      const response = await api.get('/api/diaries/');

      // 장고가 준 맛있는 JSON 데이터를 바구니에 쏙!
      setDiaries(response.data);
      console.log("데이터 가져오기 성공:", response.data);
    } catch (error) {
      console.error("장고 서버가 대답이 없어요..:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 일기 목록 📒</Text>

      {/* [4] 바구니(diaries)에 담긴 내용을 화면에 뿌리기 */}
      <FlatList
        data={diaries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.diaryCard}>
            <Text style={styles.diaryTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  diaryCard: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 3 },
  diaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 }
});