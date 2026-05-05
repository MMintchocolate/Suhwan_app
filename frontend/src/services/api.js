import axios from 'axios';
import { API_URLS } from '../constants/urls';

// 1. 기본 설정 (에뮬레이터용 IP 10.0.2.2)
const api = axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

// 2. 일기 목록 가져오는 함수
export const fetchDiaries = async () => {
  try {
    const response = await api.get(API_URLS.DIARY_LIST)
    return response.data
  }
  catch (error) {
    console.error("에러발생 일기 목록 못불러옴", error)
  }
};

// 세부 일기 불러오기
export const fetchDiariesDetail = async (id) => {
  try {
    const url = API_URLS.DIARY_DETAIL(id);
    const response = await api.get(url)
    console.log("전체 데이터:", response.data);
    return response.data
  }
  catch (error) {

    console.error("세부 내용을 불러오지 못했습니다.", error)
  }
};

// 세부 일기 수정 삭제 하기
export const fetchDiariesUpdate = async (id) => {
  try {
    const url = API_URLS.DIARY_UPDATE(id); s
    console.log("수정 데이터:", response.data);
    return response.data
  }
  catch (error) {

    console.error("세부 내용을 불러오지 못했습니다.", error)
  }
};

// 수정화면 진입 시 기존 데이터 가져오는 함수
export const fetchDiaryForEdit = async (id) => {
  try {
    const url = API_URLS.DIARY_UPDATE(id); // 장고의 diary_update 뷰 연결
    const response = await api.get(url);
    return response.data; // 기존 일기 데이터(instance) 반환
  } catch (error) {
    console.error("수정용 데이터를 불러오지 못했습니다.", error);
  }
};