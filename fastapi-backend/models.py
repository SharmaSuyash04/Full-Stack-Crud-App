from sqlalchemy import Column, Integer, String, DECIMAL#Imports classes used to define columns in your ORM models
from database import Base

class Employee(Base):                                   #class Employee(Base): defines a new ORM model called Employee that represents a table named employee.
    __tablename__ = "employee"                          #This class defines the structure of the employee table in your database,
                                                        # with columns for ID, first name, last name, email, and salary.
    id = Column(Integer, primary_key=True, index=True)  #Each instance of Employee represents a row in the table.
    first_name = Column(String(50))
    last_name = Column(String(50))
    email = Column(String(100))
    salary = Column(DECIMAL(10, 2))

#  NEW: User model for login authentication
class User(Base): #class User(Base): defines a new ORM model called User that represents a table named users.
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)  # Will store hashed password

