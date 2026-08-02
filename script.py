import requests
import psycopg

conn = psycopg.connect(
    host="localhost",
    dbname="test",
    user="ed",
    password="arcmekit711",
    port=5432
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