# Espace_Sante
Web platform in the health field. Read the file [a relative link](Project_description.md) for more information.

# Environment and dependencies installation
```
python -m venv .venv
.venv\Scripts\activate
.venv\Scripts\python -m pip install -r requirements.txt
cd esante\theme\static_src
npm install
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

https ::
daphne -e ssl:192.168.88.119:8000:privateKey=C:/Users/tomix/Documents/Hackathon_ODD/Espace_Sante/esante/server.key:certKey=C:/Users/tomix/Documents/Hackathon_ODD/Espace_Sante/esante/server.crt esante.asgi:application

```
