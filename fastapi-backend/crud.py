from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_employees(db: Session):#get_employees returns a list of all employees from the database.
    return db.query(models.Employee).all()#db.query(models.Employee)Creates a query for the Employee table (model)..all()Executes the query and returns a list of all employee records.

def create_employee(db: Session, employee: schemas.EmployeeCreate):#This function takes validated employee data, creates a new employee in the database, and returns the created employee record.
    db_employee = models.Employee(**employee.dict())#Converts the Pydantic schema (employee) to a dictionary and unpacks it to create a new Employee ORM object.
    db.add(db_employee)#Adds the new employee object to the current database session.
    db.commit()#Saves the changes to the database
    db.refresh(db_employee)#Refreshes the employee object with the latest data from the database
    return db_employee

def update_employee(db: Session, employee_id: int, updated_data: schemas.EmployeeUpdate):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()#Looks up the employee in the database by their id.
    if employee:#Checks if the employee exists.
        for key, value in updated_data.dict(exclude_unset=True).items():#Loops through only the fields provided in the update request (ignores fields not set).
            setattr(employee, key, value)#Loops through only the fields provided in the update request (ignores fields not set).
        db.commit()
        db.refresh(employee)
    return employee

def delete_employee(db: Session, employee_id: int):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if employee:
        db.delete(employee)
        db.commit()
    return employee


def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or not verify_password(password, user.password):
        return None
    return user

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user