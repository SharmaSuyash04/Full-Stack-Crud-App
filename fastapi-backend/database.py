from sqlalchemy import create_engine #Imports the create_engine function, which is used to establish a connection to your database.
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace username, password with your MySQL credentials
DATABASE_URL = "mysql+pymysql://root:Sukyash%4012345@localhost:3306/company_db"


# Create engine
engine = create_engine(DATABASE_URL)

# Session for DB interaction
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()#Base = declarative_base() creates a base class called Base.
                         #All your ORM models (like User) (see models.py) must inherit from the base class created by declarative_base().
                         #This is how SQLAlchemy knows which classes should be mapped to database tables.