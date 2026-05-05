import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Button, Alert } from 'react-native';
import { updateDiary } from '../services/api'; // 수정 전용 PATCH 함수

export default function DiaryEditScreen({ route, navigation }) {
  // 1. 소포 수령 (이전 화면에서 diary 객체를 통째로 넘겼다고 가정)
  const { diary } = route.params;

  // 2. 초기값을 소포로 받은 데이터로 바로 설정 (서버 부하 감소 & 속도 향상)
  const [title, setTitle] = useState(diary?.title || '');
  const [content, setContent] = useState(diary?.content || '');

  // 3. 수정 처리 함수
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("알림", "제목과 내용을 입력해주세요.");
      return;
    }

    // api.js에 정의된 patch 함수 호출
    const success = await updateDiary(diary.id, { title, content });

    if (success) {
      Alert.alert("알림", "수정되었습니다.");
      // 상세 화면도 업데이트되길 원한다면 navigation.navigate('DiaryDetail', { id: diary.id }) 도 방법입니다.
      navigation.goBack();
    } else {
      Alert.alert("에러", "수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>내용</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="수정 완료" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 8, fontSize: 16 },
  contentInput: { height: 150, textAlignVertical: 'top', borderAroundWidth: 1 }
});