from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.contrib.auth import get_user_model

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

@login_required
@medecin_required
def medecin_home_view(request):
    # Récupérer la liste des membres (patients)
    User = get_user_model()
    membres = User.objects.filter(user_type='membre')  # Filtrer uniquement les membres
    return render(request, 'accounts/medecin_home.html', {'membres': membres})



def login_view(request):
    if request.user.is_authenticated:
        return redirect('member_home' if request.user.user_type == 'membre' else 'medecin_home')
    
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('member_home' if user.user_type == 'membre' else 'medecin_home')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

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
@membre_required
def member_home_view(request):
    return render(request, 'accounts/member_home.html')

def home_view(request):
    if request.user.is_authenticated and request.user.user_type == 'membre':
        return redirect('member_home')
    elif request.user.is_authenticated and request.user.user_type == 'medecin':
        return redirect('medecin_home')
    return render(request, 'accounts/home.html')

