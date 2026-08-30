from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


class User(BaseModel):
    username: str
    password: str

class Review(BaseModel):
    story_id: int
    rating: int
    review: str

class List(BaseModel):
    list_name: str

class Goat(BaseModel):
    manga_id: int

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_user(token: str = Depends(oauth2_scheme)):
    try: 
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        user_id = payload["user_id"]
        return user_id

    except(JWTError, KeyError, ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid token."
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

@app.get('/profile')
def profile(user_id: int = Depends(get_user)):
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
                m.title,
                m.cover_url
            FROM rating r
            JOIN manga m ON r.manga_id = m.id
            WHERE r.user_id = %s
            LIMIT 4
            """, (user_id,))
            user_reviews = cur.fetchall()

            return {"user_info": user_info, "user_goat": user_goat, "user_lists": user_lists, "user_reviews": user_reviews}

@app.get('/reviews')
def get_reviews(user_id: int = Depends(get_user)):
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

@app.get('/profile/lists')
def profile_lists(user_id: int = Depends(get_user)):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            SELECT l.*
            FROM lists l
            WHERE l.user_id = %s;
            """, (user_id,))
            return cur.fetchall()

@app.get('/profile/lists/{list_id}')
def list_content(list_id: int, user_id: int = Depends(get_user)):
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
            """, (user_id, list_id))
            return cur.fetchall()

@app.post('/register')
def register(user: User):

    hashed_password = pwd_context.hash(user.password)

    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO registered_user (username, password)
            VALUES (%s, %s)
            RETURNING user_id
            """, (user.username, hashed_password))
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
            SELECT user_id, password
            FROM registered_user
            WHERE username = %s
            """, (user.username,))
            user_login = cur.fetchone()
            
            if not user_login:
                raise HTTPException(
                    status_code=401,
                    detail="Invalid username or password"
                )

            if not pwd_context.verify(user.password, user_login["password"]):
                raise HTTPException(status_code=401, detail="Invalid username or password")

            token = jwt.encode(
                {"user_id" : user_login["user_id"]}, SECRET_KEY, algorithm="HS256"
            )

            return {"token" : token}


@app.post('/add_review')
def add_review(review: Review, user_id: int = Depends(get_user)):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO rating (user_id, manga_id, rating, review)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (manga_id) DO UPDATE SET 
                rating = EXCLUDED.rating, 
                review = EXCLUDED.review
            """, (user_id, review.story_id, review.rating, review.review))

@app.post('/add_list')
def add_list(list: List, user_id: int = Depends(get_user)):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO lists (user_id, list_name)
            VALUES (%s, %s)
            """, (user_id, list.list_name))

@app.post('/add_goat')
def add_goat(goat: Goat, user_id: int = Depends(get_user)):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            INSERT INTO goat (user_id, manga_id)
            VALUES (%s, %s)
            """, (user_id, goat.manga_id))

@app.delete('/delete_review/{rating_id}')
def delete_rating(rating_id: int, user_id: int = Depends(get_user)):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            DELETE FROM rating
            WHERE rating_id = %s AND user_id = %s
            """, (rating_id, user_id))

@app.delete('/delete_list/{list_id}')
def delete_list(list_id: int, user_id: int = Depends(get_user)):
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            DELETE FROM lists
            WHERE list_id = %s AND user_id = %s
            """, (list_id, user_id))
