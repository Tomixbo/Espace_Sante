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
daphne -e ssl:8000:privateKey=server.key:certKey=server.crt esante.asgi:application

```

# API endpoints
Header:
```
Authorization : Token your_token
```
To get new token : 
```
python manage.py drf_create_token <your_username>
```
Methods:
```
GET http://127.0.0.1:8000/api/check-availability/?date=2024-10-25&hour=14
# date : format YYYY-MM-DD
# hour : integer between 0 to 23
```

```
POST http://127.0.0.1:8000/api/create-consultation/
```
```
{
    "doctor": 3,
    "patient": 2,
    "facility": "Online",
    "consultation_start_time": "2024-10-20T09:00:00",
    "consultation_end_time": "2024-10-20T10:00:00"
}
# Note : Replace 2 and 5 by user id.
```
