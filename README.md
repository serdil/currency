# Currency Tracker

The repo is based on [django-react-redux-base](https://github.com/Seedstars/django-react-redux-base).

### Dependencies

This project uses docker to manage development and production runtime environments. The only dependencies are docker and docker-compose.

### How to run

Before first run and every time dependencies are updated:
```
$ docker-compose build
```

In order to run the development server:
```
$ docker-compose up
```

The application is accessible at `http://localhost:8000`.