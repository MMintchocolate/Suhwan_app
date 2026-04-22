import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import api from '../../services/api';


export default function HomeScreen() {
    const [diaries, setDiaries] = useState<any[]>([]);
    useEffect(() => {

        fetchData();

    }, []);

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
