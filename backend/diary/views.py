from rest_framework import generics
from .models import Diary
from .serializers import DiarySerializer


class DiaryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Diary.objects.all() # 어떤 데이터를 가져올 것인가?
    serializer_class = DiarySerializer # 어떤 통역사(포장지)를 쓸 것인가?

# 2. 특정 일기를 상세히 보고(Retrieve), 수정하고(Update), 삭제하는(Destroy) 뷰
class DiaryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer