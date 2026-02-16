# Employee Management System (NestJS)

This project is a simple Employee Management System built using NestJS and PostgreSQL.  
It provides basic CRUD functionality along with data export features like Excel, PDF, and PowerPoint generation.

---

## 🚀 Features

- Create, Read, Update, and Delete Employees
- PostgreSQL database integration using TypeORM
- Unique email validation
- Export employee data to:
  - Excel (.xlsx)
  - PDF (.pdf)
  - PowerPoint (.pptx)
- Automatic PPT slide pagination (limited employees per slide)
- REST API tested using Postman

---

## 🛠️ Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- XLSX (Excel export)
- PDFKit (PDF generation)
- PptxGenJS (PowerPoint generation)

---

## 📂 Project Structure

src/
├── employee/
│ ├── dto/
│ ├── employee.controller.ts
│ ├── employee.service.ts
│ ├── employee.entity.ts
│ └── employee.module.ts
├── app.module.ts
└── main.ts


---

## 📌 API Endpoints

### 🔹 CRUD Operations

- `POST /employees` → Create employee
- `GET /employees` → Get all employees
- `GET /employees/:id` → Get employee by ID
- `PUT /employees/:id` → Update employee
- `DELETE /employees/:id` → Delete employee

---

### 📊 Export APIs

- `GET /employees/excel` → Download Excel file
- `GET /employees/pdf` → Download PDF file
- `GET /employees/ppt` → Download PowerPoint file

---

## ▶️ How to Run the Project

1. Clone the repository

git clone <https://github.com/snehalrathod9423/employee-management-nestjs.git>


2. Install dependencies

npm install


3. Run the application

npm run start:dev


Server will run on:

http://localhost:3000


---

## 🧪 Testing

All APIs were tested using Postman.

---

## 📈 Future Improvements

- Add pagination
- Add filtering and sorting
- Add Swagger API documentation
- Add authentication and role-based access
- Add dashboard statistics endpoint

---

## 👨‍💻 Author

Snehal Rathod