import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchDiaries } from '../services/api'; // 우리가 만든 통신 함수 불러오기

export default function DiaryListScreen({ navigation }) {
  const [diaries, setDiaries] = useState([]); // 데이터를 담을 바구니 (초기값은 빈 배열)

  // 화면이 처음 나타날 때 딱 한 번 실행
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchDiaries(); // api.js의 함수 실행
    if (data) {
      setDiaries(data); // 바구니에 장고에서 온 일기 데이터 채우기
    }
  };

  // 리스트의 한 줄 한 줄(Item)을 어떻게 그릴지 정의
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.diaryCard}
      onPress={() => navigation.navigate('DiaryDetail', { id: item.id })} // 클릭 시 id를 가지고 상세화면 이동
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.created_at.substring(0, 10)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={diaries} // 바구니에 있는 데이터들
        renderItem={renderItem} // 각 데이터를 그리는 방법
        keyExtractor={(item) => item.id.toString()} // 각 줄의 고유 번호
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 10 },
  diaryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3, // 안드로이드 그림자
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  date: { fontSize: 13, color: '#888', marginTop: 5 },
});