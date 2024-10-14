from django.urls import path
from .views import video_call_view, call_ended_view

urlpatterns = [

    path('video-call/<int:member_id>/', video_call_view, name='video_call'),  # New video call route
    path('call-ended/', call_ended_view, name='call_ended'),

]
