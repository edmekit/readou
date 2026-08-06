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