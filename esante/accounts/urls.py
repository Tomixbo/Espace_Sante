from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import signup_view, login_view, home_view, member_home_view, medecin_home_view

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('', home_view, name='home'),
    path('member-home/', member_home_view, name='member_home'),
    path('medecin-home/', medecin_home_view, name='medecin_home'),

]
