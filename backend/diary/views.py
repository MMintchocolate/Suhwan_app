from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Diary
from .serializers import DiarySerializer

# 1. 목록 가져오기 (GET /diary/)
@api_view(['GET'])
def diary_list(request):
    diaries = Diary.objects.all().order_by('-created_at') # 최신순 정렬
    serializer = DiarySerializer(diaries, many=True) # 여러 개니까 many=True
    return Response(serializer.data)

# 2. 세부 내용 가져오기 (GET /diary/<id>/)
@api_view(['GET'])
def diary_detail(request, pk):
    try:
        diary = Diary.objects.get(pk=pk)
    except Diary.DoesNotExist:
        return Response({"error": "일기를 찾을 수 없습니다."}, status=404)
        
    serializer = DiarySerializer(diary)
    return Response(serializer.data)