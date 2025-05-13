# язык на котором написан проект, а так же его облегченная верчия(slim)
FROM python:3.13-slim
# обновление пакетов в линукс - apt-get update
# apt-get install - установит
# -y - без согласия
# gcc - устфновка языкка С т.к. некоторые пакеты пайтон с помощью языка С работают
# libpq-dev - библиотеки для БД (PostgreSQL(например psycopg2))
# rm -rf /var/lib/apt/lists/* - очищает кеш пакета, уменьшая размер образа
# WORKDIR /app - создание директории app в нутри контейнера
# COPY requirements.txt . - копируем составляющие

RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]