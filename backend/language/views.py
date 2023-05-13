from rest_framework import generics
from rest_framework.response import Response
from language.models import Language
from language.serializers import LanguageSerializer
from rest_framework.permissions import IsAuthenticated


class LanguageGenericAPI(generics.CreateAPIView, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Language.objects
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        self.queryset = self.queryset.filter(user=request.user)
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # user assigned for this record
        # is the user that made the request itself
        request.data.update({"user": request.user.id})

        return Response(self.create(request).data)
