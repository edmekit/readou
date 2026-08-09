from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv
import os

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

@app.get('/profile')
def profile():
    with psycopg.connect(DATABASE_URL) as conn:
        with conn.cursor(row_factory = dict_row) as cur:
            cur.execute("""
            SELECT user_id, user_pfp, user_name
            FROM users
            ORDER BY user_id
            """)
            user_info =  cur.fetchall()

            cur.execute("""
            SELECT m.*
            FROM goat g
            JOIN manga m
            ON g.manga_id = m.id WHERE g.user_id = 1;
            """)
            user_goat = cur.fetchall()

            cur.execute("""
            SELECT l.*
            FROM lists l
            WHERE l.user_id = 1;
            """)
            user_lists = cur.fetchall()

            return {"user_info": user_info, "user_goat": user_goat, "user_lists": user_lists}