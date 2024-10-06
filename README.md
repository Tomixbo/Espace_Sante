# Espace_Sante
Web platform in the health field

# Deployment in development
bash1 : 
```
cd esante
python manage.py tailwind start
```
bash2 :
```
cd esante
daphne -p 8000 -b 0.0.0.0 esante.asgi:application
```
