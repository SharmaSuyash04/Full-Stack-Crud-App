#A schema is a structure or blueprint that defines how data should be organized and what types of values are allowed.

from pydantic import BaseModel #BaseModel is used to define data validation and serialization schemas in Python, especially for FastAPI and other frameworks.
                               #You create your own classes by inheriting from BaseModel to ensure that data  is validated and structured correctly.
class EmployeeBase(BaseModel): #Here, EmployeeSchema will automatically validate(name=string,salary=number) and parse data(salary string is converted to float )for you.
    first_name: str
    last_name: str
    email: str
    salary: float

class EmployeeCreate(EmployeeBase):
    pass #This means the class doesn’t add any new fields or methods; it’s exactly the same as EmployeeBase for now.
         #You can add extra fields or validation rules later if needed

class EmployeeUpdate(BaseModel):
    first_name: str | None = None #(str | None) means the field can be a string or None, allowing for optional updates.=None sets the default value to None, so you don’t have to provide every field when updating an employee.
    last_name: str | None = None
    email: str | None = None
    salary: float | None = None

class Employee(EmployeeBase):#this schema adds an id field
    id: int

    class Config:           #Tells Pydantic to read data not just from dictionaries, but also from ORM models (like SQLAlchemy objects).
        orm_mode = True



class UserLogin(BaseModel):
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    password: str