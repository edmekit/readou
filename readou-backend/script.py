import requests
import psycopg
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg.connect(
  DATABASE_URL
)
cur = conn.cursor()

query = """
query ($page: Int) {
  Page(page: $page, perPage: 50) {
    media(type: MANGA) {
      id
      title {
        romaji
      }
      countryOfOrigin
      coverImage {
        large
      }
    }
  }
}
"""

variables = {"page": 1}

response = requests.post(
    "https://graphql.anilist.co",
    json={
        "query": query,
        "variables": variables
    }
)

manga = response.json()["data"]["Page"]["media"]

for m in manga:
    cur.execute(
        """
        INSERT INTO manga (anilist_id, title, cover_url)
        VALUES (%s, %s, %s)
        ON CONFLICT (anilist_id) DO NOTHING
        """,
        (
            m["id"],
            m["title"]["romaji"],
            m["coverImage"]["large"],
        ),         
    )

conn.commit()