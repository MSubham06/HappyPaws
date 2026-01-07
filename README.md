# HappyPaws – Spring PetClinic Application
Care for Every Paw!🐾🤝

**[Visit Website](https://msubham06.github.io/HappyPaws/)**



HappyPaws is a full-stack web application developed using React and Spring Boot, based on the modern Spring PetClinic architecture. The project demonstrates real-world enterprise application development practices such as layered architecture, RESTful APIs, database persistence, and role-based security.

This project is submitted as a Final Year B.Tech project for the Computer Science & Machine Learning (CSM) program at SVCET, Chittoor.

--

## Project Overview

The traditional Spring PetClinic application mainly focuses on backend concepts and does not reflect modern enterprise-level development. HappyPaws enhances this by integrating a React-based frontend with a Spring Boot backend, making it closer to a production-oriented full-stack application.

The system is designed to manage veterinary clinic operations including owners, pets, visits, and veterinarians through a centralized and structured platform.

---

## Objectives

- To design and develop a full-stack web application using React and Spring Boot  
- To implement CRUD operations on real-world entities  
- To follow layered architecture principles  
- To build RESTful APIs with proper database persistence  
- To create a clean, maintainable, and easy-to-understand the  reference project.  

---

## Technology Stack

### Frontend
- React.js  v18.2.0   
- HTML5  
- CSS3  
- JavaScript (ES6+)  

### Backend
- Java v17 
- Spring Boot v3.9.5 
- Spring MVC v6.1.x 
- Spring Data JPA  v3.2.x

### Database
- MySQL v8.0.x 

### Tools
- VS Code v1.107 
- Maven v3.9.5 
- Git and GitHub v2.40+ 
- Postman v10+ 

---

## Modules Implemented

- Owner Module  
- Pet Module  
- Visit Module  
- Veterinarian Module  
- Authentication and Authorization Module  

---

## Key Features

- User authentication and authorization  
- Role-based access control  
- Owner, pet, visit, and veterinarian management  
- RESTful API-based frontend and backend communication  
- Secure and modular layered architecture  

---

## System Architecture

The application follows a Client–Server Architecture model:

- The frontend is developed using React and handles user interactions  
- Communication between frontend and backend is performed using RESTful APIs with JSON data  
- The backend is developed using Spring Boot and follows a layered architecture  
- The database layer uses MySQL with object–relational mapping through JPA  
- Security is implemented using Spring Security with role-based access control  

---

## How to Run the Project

### Backend
- Open the backend project in VS Code or IntelliJ  
- Configure the MySQL database details in the application properties file  
- Run the Spring Boot application  

### Frontend
- Navigate to the frontend project folder  
- Install the required dependencies  
- Start the React application  

---

## Team Members

- M Subham – [Click here to open profile](https://github.com/MSubham06)
- Abhishek Kumar (Team Leader) – [Click here to open profile](https://github.com/Amazeabhi/)  
- B Girinath Reddy – [Click here to open profile](https://github.com/Girinath3318) 
- Chapala Praveen – [Click here to open profile](https://github.com/praveenchapala)
- Gudipati Jayasimha Vardhan – [Click here to open profile](https://github.com/jayasimha-vardhan)


---

## Project Documentation

Project Report (PDF): [Click here to open final year project pdf](https://github.com/MSubham06/HappyPaws/blob/main/Project%20Report%20Spring%20PetClinic%20Application.pdf)

---

## Limitations

- Designed for single-clinic usage  
- Uses basic security mechanisms  
- Does not support real-time notifications  
- Not optimized for large-scale or high-traffic deployment  

---

## Future Enhancements

- JWT-based authentication and authorization  
- Deployment on cloud platforms such as AWS or GCP  
- Mobile application development  
- Migration to a microservices-based architecture  
- Integration of AI-based pet health analysis and recommendations  

---

## 🔗 Reference Websites

### 🐾 Pet Care & Veterinary Platforms

- **Dr. Pet Online**  🔗 [Open Website](https://drpetonline.in/)

- **Supertails Clinic**  🔗 [Open Website](https://supertails.com/pages/supertails-clinic)

- **Zigly Pet Care**  🔗 [Open Website](https://stores.zigly.com/locations/hyderabad/sindhi-colony/zigly-pet-care-vet-clinic-pet-grooming-pet-products-in-sindhi-colony-hyderabad--1a1pg8/home)
---

## Conclusion

HappyPaws demonstrates a modern full-stack web application using React and Spring Boot. The project effectively bridges academic learning with industry-level development practices by showcasing clean architecture, structured design, and real-world application workflows.

---
# Helping Guides Below 

---
## 🐾 HappyPaws Database Documentation
 
**Database Schema:** `clinic`  
**Database Engine:** MySQL 8.0+  
**Management Tool:** MySQL Workbench

---

## 📋 1. Prerequisites

Before starting, ensure you have the following installed and ready:

* **MySQL Server** (Localhost running on port `3306`)
* **MySQL Workbench**
* **Source Data:** Ensure the `database/Dump` folder is present in your project directory.
    * *Path Example:* `C:\Users\HP\Desktop\HappyPaws\database\Dump`

---

## 📥 2. How to Import the Database

Follow these steps to restore the `clinic` database from the project dump files.

### Step 1: Open Data Import
1.  Open **MySQL Workbench**.
2.  Connect to your local instance (e.g., `Local instance MySQL`).
3.  In the top menu bar, go to **Server** $\rightarrow$ **Data Import**.

### Step 2: Select the Source Folder
1.  Under **Import Options**, select the radio button:
    > 🔘 **Import from Dump Project Folder**
2.  Click the **`...`** button and browse to your project's dump folder:
    * Select: `.../HappyPaws/database/Dump`
3.  *Important:* Do **NOT** select "Import from Self-Contained File".

### Step 3: Configure Target Schema
1.  Look at the **"Default Schema to be Imported To"** section.
2.  Check the dropdown list for `clinic`.
    * **If `clinic` exists:** Select it.
    * **If `clinic` is MISSING:**
        1.  Click the **New...** button.
        2.  Type `clinic` as the name.
        3.  Click **OK**.
3.  Ensure `clinic` is selected in the dropdown.

### Step 4: Execute Import
1.  In the **Select Database Objects to Import** box, click on `clinic`.
2.  Ensure **all table checkboxes** on the right side are checked.
3.  Verify the dropdown setting below is set to: **Dump Structure and Data**.
4.  Click the **Start Import** button (bottom right corner).

---

## ✅ 3. Verification

To verify the database is set up correctly:

1.  Go to the **Schemas** tab in the left Navigator panel.
2.  Right-click empty space $\rightarrow$ **Refresh All**.
3.  Expand `clinic` $\rightarrow$ `Tables`.
4.  Right-click `pets` (or any table) $\rightarrow$ **Select Rows - Limit 1000**.
5.  *Success:* You should see data populated in the results grid.

---

## 📤 4. How to Backup (Export)

If you make changes to the database and want to save a new backup:

1.  Go to **Server** $\rightarrow$ **Data Export**.
2.  In the left column, click the checkbox for **`clinic`**.
3.  Under **Export Options**:
    * Select **Export to Dump Project Folder**.
    * Choose the path to your `.../HappyPaws/database/Dump` folder.
4.  Check **"Include Create Schema"**.
5.  Click **Start Export**.

---

## 🛠️ 5. Troubleshooting Common Errors

| Error | Cause | Solution |
| :--- | :--- | :--- |
| **ERROR 1049: Unknown database 'clinic'** | The database schema has not been created yet. | See **Step 3**: Click the **New...** button to create the `clinic` schema first. |
| **Dump file not found / Access Denied** | The tool is looking for a single `.sql` file but you provided a folder. | In **Step 2**, ensure you selected **"Import from Dump Project Folder"**. |
| **Table 'clinic.xyz' doesn't exist** | You imported data but not the table structure. | Ensure **Dump Structure and Data** is selected in the dropdown menu. |
| **Connection Refused** | MySQL Server is not running. | Open **Services** (Windows) and start the `MySQL80` service. |

---
# HappyPaws PetClinic - Backend API

It is built with **Spring Boot** and features a secure authentication system using **Spring Security** and **JSON Web Tokens (JWT)**.

## 🚀 Features
- **User Registration:** Create new accounts with role-based access.
- **Secure Login:** Authenticate users and generate JWT tokens.
- **Protected Endpoints:** Restrict access to pet and owner data using Bearer Tokens.
- **Stateless Security:** Uses JWT for session management (no server-side sessions).
  
---

## 🔑 Authentication Guide

The API is secured. You must **Login** first to get a "Key" (Token), and then use that Key to access data.

### 1. Default Admin Credentials
Use these credentials to test the system immediately:
- **Email:** `admin@happypaws.com`
- **Password:** `securePassword123`

### 2. How to Log In (Get Your Token)
This step proves your identity and provides you with a **JWT Token**.

* **Endpoint:** `POST /api/auth/login`
* **URL:** `http://localhost:8082/api/auth/login`

**Steps:**
1.  Open **Postman**.
2.  Set request method to **POST**.
3.  In the **Body** tab, select **raw** -> **JSON**.
4.  Paste the credentials:
    ```json
    {
      "email": "admin@happypaws.com",
      "password": "securePassword123"
    }
    ```
5.  Click **Send**.
6.  **Copy the Response:** The long string starting with `eyJ...` is your Token.

### 3. How to Access Protected Data
Once you have the token, you can access locked pages (like Pets, Owners, Vets).

* **Endpoint:** `GET /api/pets` (or other protected routes)
* **URL:** `http://localhost:8082/api/pets`

**Steps:**
1.  Create a new **GET** request in Postman.
2.  Go to the **Authorization** tab (under the URL bar).
3.  In the **Type** dropdown, select **Bearer Token**.
4.  In the **Token** field on the right, **paste your JWT Token**.
5.  Click **Send**.

> **Note:** If you get a `403 Forbidden` error, your token may be missing or expired. Tokens are valid for **10 hours**.

---

## 📂 Project Structure (Security)

* **`config/SecurityConfig.java`**: Main security rules. Defines which pages are public (Register/Login) and which are private.
* **`controller/AuthController.java`**: Handles Login/Register requests.
* **`util/JwtUtils.java`**: The "Machine" that generates and validates tokens.
* **`filter/JwtAuthenticationFilter.java`**: The "Guard" that checks every request for a valid token.
* **`service/CustomUserDetailsService.java`**: Loads user data from the database for verification.

---

## ❓ Troubleshooting

| Error | Cause | Solution |
| :--- | :--- | :--- |
| **403 Forbidden (Login)** | Wrong password or email. | Check your JSON body for typos. |
| **403 Forbidden (Data)** | Missing Token. | Ensure you added the token in the **Authorization** tab as a **Bearer Token**. |
| **405 Method Not Allowed** | Wrong Request Type. | Check if you are using **GET** instead of **POST** (or vice versa). |
| **ECONNREFUSED** | Server is down. | Restart the Spring Boot application. |

---

## 🏃‍♂️ How to Run

1.  Clone the repository.
2.  Update `application.properties` with your MySQL database details.
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
4.  Server will start on: `http://localhost:8082`
---
⚠️ Note : Team Update the process of running and importing as Guide to Help!
