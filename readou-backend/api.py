from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv
import os
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class Review(BaseModel):
    user_id: int
    story_id: int
    rating: int
    review: str

class List(BaseModel):
    user_id: int
    list_name: str

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/stories')
def get_stories():
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            SELECT id, title, cover_url
            FROM manga
            ORDER BY id
            """)
            return cur.fetchall()

@app.get('/{user_id}/profile')
def profile(user_id: int):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
                SELECT user_id, user_pfp, user_name
                FROM users
                WHERE user_id = %s
            """, (user_id,))
            user_info = cur.fetchone()

            cur.execute("""
            SELECT m.*
            FROM goat g
            JOIN manga m
            ON g.manga_id = m.id WHERE g.user_id = %s;
            """, (user_id,))
            user_goat = cur.fetchall()

            cur.execute("""
            SELECT l.*
            FROM lists l
            WHERE l.user_id = %s
            LIMIT 3;
            """, (user_id,))
            user_lists = cur.fetchall()

            cur.execute(
                """
            SELECT
                r.rating_id,
                r.user_id,
                r.manga_id,
                r.rating,
                r.review,
                m.title
            FROM rating r
            JOIN manga m ON r.manga_id = m.id
            WHERE r.user_id = %s
            LIMIT 3
            """, (user_id,))
            user_reviews = cur.fetchall()

            return {"user_info": user_info, "user_goat": user_goat, "user_lists": user_lists, "user_reviews": user_reviews}

@app.get('/{user_id}/reviews')
def get_reviews(user_id: int):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            SELECT
                r.rating_id,
                r.user_id,
                r.manga_id,
                r.rating,
                r.review,
                m.title,
                m.cover_url
            FROM rating r
            JOIN manga m ON r.manga_id = m.id
            WHERE r.user_id = %s
            """, (user_id,))
            return cur.fetchall()

@app.get('/{user_id}/profile/lists')
def profile_lists(user_id: int):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            SELECT l.*
            FROM lists l
            WHERE l.user_id = %s;
            """, (user_id,))
            return cur.fetchall()

@app.get('/{user_id}/profile/lists/{list_id}')
def list_content(user_id: int, list_id: int):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute(""" 
            SELECT
                m.*
            FROM lists l
            JOIN per_list pl
                ON l.list_id = pl.list_id
            JOIN manga m
                ON pl.manga_id = m.id
            WHERE l.user_id = %s AND l.list_id = %s
            """, (user_id, list_id,))
            return cur.fetchall()

@app.post('/register')
def register(user: User):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO registered_user (username, password)
            VALUES (%s, %s)
            RETURNING user_id
            """, (user.username, user.password))
            user_id = cur.fetchone()["user_id"]

            cur.execute("""
            INSERT INTO users (user_id, user_name)
            VALUES (%s, %s)
            """, (user_id, user.username,))

            return user_id

@app.post('/login')
def login(user: User):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            SELECT user_id
            FROM registered_user
            WHERE username = %s AND password = %s
            """, (user.username, user.password))
            user_login = cur.fetchone()

            if user_login:
                return user_login
            else:
                raise HTTPException(status_code=401, detail="Invalid username or password")

@app.post('/stories/add_review')
def add_review(review: Review):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO rating (user_id, manga_id, rating, review)
            VALUES (%s, %s, %s, %s)
            """, (review.user_id, review.story_id, review.rating, review.review))

@app.post('/add_list')
def add_list(list: List):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO lists (user_id, list_name)
            VALUES (%s, %s)
            """, (list.user_id, list.list_name))