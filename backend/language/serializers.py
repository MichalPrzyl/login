from rest_framework import serializers
# models
from language.models import Language
from django.contrib.auth.models import User

class UserRelatedField(serializers.RelatedField):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username
        }
    def to_internal_value(self, data):
        return User.objects.get(id=data)

class LanguageSerializer(serializers.ModelSerializer):
    # user = serializers.CharField(source='user.username', read_only=True)
    user = UserRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Language
        fields = "__all__"
