# Espace_Sante
Web platform in the health field

# Environment and dependencies installation
```
python -m venv .venv
.venv\Scripts\activate
.venv\Scripts\python -m pip install -r requirements.txt
```

# Deployment in development
bash1 : 
```
.venv\Scripts\activate
cd esante
python manage.py tailwind start
```
bash2 :
```
.venv\Scripts\activate
cd esante
daphne -p 8000 -b 0.0.0.0 esante.asgi:application
```
