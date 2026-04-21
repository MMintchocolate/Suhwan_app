from rest_framework import serializers
from .models import Diary

class DiarySerializer(serializers.ModelSerializer):
    class Meta: # Serializer가 일을 어떻게 해야 할지 알려주는 '설정 가이드'
        model = Diary
        fields = ['id', 'title', 'content', 'created_at', 'image']