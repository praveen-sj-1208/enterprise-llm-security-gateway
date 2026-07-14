from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from urllib.parse import quote_plus
import os

# Load Environment Variables
load_dotenv()

# ===============================
# DATABASE URL (Render / Neon)
# ===============================

DATABASE_URL = os.getenv("DATABASE_URL")

# ===============================
# Local PostgreSQL Fallback
# ===============================

if not DATABASE_URL:

    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_NAME = os.getenv("DB_NAME", "enterprise_gateway")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = quote_plus(os.getenv("DB_PASSWORD", ""))

    DATABASE_URL = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

print("=" * 60)
print("Database Configuration")
print("=" * 60)
print("DATABASE_URL :", DATABASE_URL.split("@")[1])
print("=" * 60)

# ===============================
# SQLAlchemy Engine
# ===============================

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ===============================
# Connection Test
# ===============================

try:

    with engine.connect() as conn:

        print("✅ Database Connected Successfully!")

        version = conn.execute(
            text("SELECT version();")
        ).fetchone()

        print("PostgreSQL Version:")
        print(version[0])

except Exception as e:

    print("❌ Database Connection Failed!")
    print(e)