from .serializers import ImageSerializer
from .models import Images
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import  api_view
from rest_framework.parsers import JSONParser
import tensorflow as tf
import cv2
import tensorflow_hub as hub
import numpy as np
from django.http import JsonResponse
import pandas as pd
# Create your views here.

class uploadImage(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        image = Images.objects.all()
        serializer = ImageSerializer(image, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        image_serializer = ImageSerializer(data=request.data)
        if image_serializer.is_valid():
            image_serializer.save()
            return Response(image_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', image_serializer.errors)
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@csrf_exempt
@api_view(['POST'])
def prediction(request):
    data = JSONParser().parse(request)
    print('data = ',data)
    image = cv2.imread(f"media/images/{data['filename']}")
    print(image)
    img = cv2.resize(image,(224,224))
    img = img/255
    img = img.reshape(1,224,224,3)
    model = tf.keras.models.load_model('media/model/my_model.h5',custom_objects={'KerasLayer':hub.KerasLayer})
    pred = model.predict(img)
    return JsonResponse({"prediction":pred[0].tolist()})