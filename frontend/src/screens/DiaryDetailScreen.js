import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { fetchDiariesDetail } from '../services/api'; // 우리가 만든 통신 함수 불러오기
import { API_URLS } from '../constants/urls';

export default function DiaryDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchDiariesDetail(id);
    if (data) {
      setDiary(data);
    }
  };
  if (!diary) {
    return (
      <View style={styles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {diary.image_url && (
        <Image
          source={{ uri: `http://10.0.2.2:8000${diary.image_url}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{diary.title}</Text>
      <Text style={styles.content}>{diary.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover' // 이미지가 찌그러지지 않게 채워줍니다.
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24 },
});