# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

# 🔸簡單定義一個 Serializer（非 model）
class FakeProjectSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    start_date = serializers.DateField()

    class Meta:
        example = {
            "title": "測試專案",
            "description": "這是一個假的專案，不用資料庫",
            "start_date": "2025-01-01"
        }

# 🔸不依賴 model 的 APIView
class ProjectListView(APIView):

    @swagger_auto_schema(
        operation_description="取得假專案列表",
        responses={200: FakeProjectSerializer(many=True)}
    )
    def get(self, request):
        fake_data = [
            {"title": "測試A", "description": "描述A", "start_date": "2025-01-01"},
            {"title": "測試B", "description": "描述B", "start_date": "2025-02-01"},
        ]
        return Response(fake_data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="新增假專案",
        request_body=FakeProjectSerializer,
        responses={201: "Created", 400: "Bad Request"}
    )
    def post(self, request):
        serializer = FakeProjectSerializer(data=request.data)
        if serializer.is_valid():
            # 不寫入資料庫，只是 echo 回傳
            return Response({"message": "收到資料", "data": serializer.validated_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
