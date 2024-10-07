from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.contrib.auth.views import LogoutView

def medecin_required(view_func):
    def _wrapped_view_func(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.user_type == 'medecin':
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Vous n'êtes pas autorisé à accéder à cette page.")
    return _wrapped_view_func

def membre_required(view_func):
    def _wrapped_view_func(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.user_type == 'membre':
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden("Vous n'êtes pas autorisé à accéder à cette page.")
    return _wrapped_view_func



def login_view(request):
    if request.user.is_authenticated:
        return redirect('member_home' if request.user.user_type == 'membre' else 'medecin_home')
    
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)

            # Mark user as online
            user.is_online = True
            user.last_seen = timezone.now()
            user.save()

            # Redirect based on user type
            return redirect('member_home' if user.user_type == 'membre' else 'medecin_home')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

class CustomLogoutView(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        # Mark user as offline before logout
        user = request.user
        if user.is_authenticated:
            user.is_online = False
            user.save()
        return super().dispatch(request, *args, **kwargs)

def signup_view(request):
    if request.user.is_authenticated:
        return redirect('member_home' if request.user.user_type == 'membre' else 'medecin_home')
    
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('member_home' if user.user_type == 'membre' else 'medecin_home')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/signup.html', {'form': form})


@login_required
@medecin_required
def medecin_home_view(request):
    context = {
        'user': request.user
    }
    return render(request, 'accounts/medecin_home.html', context)

@login_required
@membre_required
def member_home_view(request):
    context = {
        'user': request.user
    }
    return render(request, 'accounts/member_home.html', context)

def home_view(request):
    if request.user.is_authenticated and request.user.user_type == 'membre':
        return redirect('member_home')
    elif request.user.is_authenticated and request.user.user_type == 'medecin':
        return redirect('medecin_home')
    return render(request, 'accounts/home.html')

