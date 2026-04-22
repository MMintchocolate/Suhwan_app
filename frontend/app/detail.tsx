import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

export default function DetailScreen() {
    const { title, content, created_at } = useLocalSearchParams(); // 전달된 파라미터 수신
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* 커스텀 헤더 (뒤로가기 버튼) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>← 목록으로</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.dateText}>
                    {created_at ? new Date(created_at as string).toLocaleDateString() : ''}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.bodyText}>{content}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    backButton: { alignSelf: 'flex-start' },
    backText: { fontSize: 16, color: '#4A90E2', fontWeight: '600' },
    content: { padding: 25 },
    titleText: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10 },
    dateText: { fontSize: 14, color: '#999', marginBottom: 20 },
    divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 25 },
    bodyText: { fontSize: 17, lineHeight: 28, color: '#333' },
});