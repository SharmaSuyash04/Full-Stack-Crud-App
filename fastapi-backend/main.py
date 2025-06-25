#python -m uvicorn main:app --reload to run
# Uvicorn  It serves your FastAPI app, handling HTTP requests and responses. You use it to run your FastAPI application, 
from fastapi import FastAPI, Depends, HTTPException #Imports FastAPI for building APIs, Depends for dependency injection, and HTTPException for error handling.
#In FastAPI, dependency injection is used to provide things like database sessions, authentication, or configuration to your endpoint functions.
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud
from fastapi.middleware.cors import CORSMiddleware # CORS for handling cross-origin requests
#CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to control which resources can be requested from different origins (domains).
#(needed for frontend-backend communication).
from passlib.context import CryptContext  # Imports CryptContext for password hashing and verification.

#  Password hashing config
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI() #Initializes the FastAPI application.

#  CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adds CORS middleware to allow requests from any origin (for development).
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() #Closes the database session after use.

#  EMPLOYEE ROUTES
@app.get("/employees", response_model=list[schemas.Employee])#This line defines a GET endpoint at /employees.The response will be a list of Employee objects, as defined in your schemas.
def read_employees(db: Session = Depends(get_db)):#This defines the function that handles the endpoint.
    return crud.get_employees(db)
#db: Session = Depends(get_db) tells FastAPI to use dependency injection to provide a database session using the get_db function.

@app.post("/employees", response_model=schemas.Employee)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    # This endpoint handles POST requests to /employees to add a new employee.
    # 'employee' is the data sent in the request body, validated by the EmployeeCreate schema.
    # 'db' is a database session provided by dependency injection.
    # Calls the create_employee function in the crud module to add the employee to the database.
    # Returns the newly created employee as the response.
    return crud.create_employee(db, employee)

@app.put("/employees/{employee_id}", response_model=schemas.Employee)
def update_employee(employee_id: int, employee_data: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    # This endpoint handles PUT requests to /employees/{employee_id} to update an existing employee.
    # 'employee_id' is taken from the URL path.
    # 'employee_data' is the updated data sent in the request body, validated by the EmployeeUpdate schema.
    # 'db' is a database session provided by dependency injection.
    updated = crud.update_employee(db, employee_id, employee_data)  # Calls the update_employee function in the crud module.
    if updated is None:
        # If no employee is found with the given ID, raise a 404 error.
        raise HTTPException(status_code=404, detail="Employee not found")
    # Returns the updated employee as the response.

@app.delete("/employees/{employee_id}", response_model=schemas.Employee)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_employee(db, employee_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return deleted

#  LOGIN ROUTE — fixed password check
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    # This endpoint handles POST requests to /login for user authentication.
    # 'user' contains the login data (username and password), validated by the UserLogin schema.
    # 'db' is a database session provided by dependency injection.
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    # Looks up the user in the database by username.
    if not existing_user or not pwd_context.verify(user.password, existing_user.password):
        # If the user doesn't exist or the password is incorrect, raise a 401 Unauthorized error.
        raise HTTPException(status_code=401, detail="Invalid username or password")
    # If authentication is successful, return a success message and the username.
    return {"message": "Login successful", "username": user.username}

#  SIGNUP — hashes password before saving
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "Signup successful"}
