import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import api from '../../services/api';


export default function HomeScreen() {
    // 백엔드에서 받아온 데이터를 담을 공간 부여
    // useState 하면 [변수, 함수] 형태로 변수를 만들어주고 함수 기능까지 부여함
    // 함수 기능 : json 형태로 변환
    const [diaries, setDiaries] = useState<any[]>([]);
    const router = useRouter(); // 1. router 객체 생성


    // 앱이 시작하면 바로 할 내용들 == main 구동
    useEffect(() => {

        fetchData();

    }, []); // 빈배열을 주는 이유 : 한번만 실행하기 위함

    const fetchData = async () => {
        try {
            const response = await api.get('/diary/');

            setDiaries(response.data)
            console.log("데이터 가져오기 성공:", response.data);

        } catch (error) {
            console.log("데이터 가져오기 실패:", error);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>내 일기 dd목록 📒</Text>
            <FlatList
                data={diaries}

                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (

                    <TouchableOpacity
                        style={styles.diaryCard}
                        onPress={() => router.push({
                            pathname: "/detail", // app/detail.tsx 파일로 이동
                            params: {
                                title: item.title,
                                content: item.content,
                                created_at: item.created_at
                            }
                        })}
                    >
                        <Text style={styles.diaryTitle}>{item.title}</Text>
                        {/* 본문은 리스트에서 너무 길면 안되니까 한 줄만 보여주기 */}
                        <Text numberOfLines={1} style={styles.diaryContent}>
                            {item.content}
                        </Text>
                    </TouchableOpacity>

                )}

            />

        </View>

    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
    diaryCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        // iOS에서도 그림자가 보이게 하려면 아래 설정이 필요해요
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    diaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    diaryContent: { color: '#666', fontSize: 14 }
});