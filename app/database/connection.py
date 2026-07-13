from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
from urllib.parse import quote_plus

DB_PASSWORD = quote_plus(os.getenv("DB_PASSWORD"))

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

print("HOST:", DB_HOST)
print("USER:", DB_USER)
print("PASSWORD:", DB_PASSWORD)
print("URL:", DATABASE_URL)

try:
    conn = engine.connect()
    print("✅ Database Connected Successfully!")

    result = conn.execute(text("SELECT version();"))
    print(result.fetchone())

    conn.close()

except Exception as e:
    print("❌ Database Connection Failed!")
    print(e)