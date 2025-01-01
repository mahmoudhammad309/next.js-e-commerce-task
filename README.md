# **E-commerce NEXTJS Task**


## **Features**

### **User Authentication and Authorization**
- **Registration & Login:**
  - Standard user registration and login pages with validation.
  - Securely manages user sessions.
- **Role-Based Access:**
  - Admin users are redirected to the Admin Dashboard.
  - Regular users are redirected to the Products Page.

### **Product Management**
- **Product Display:**
  - A small, reusable component to display product details.

### **Route Protection**
- Ensures that:
  - Only admins can access admin dashboard.
  - Regular users are restricted to home pages.

## **Technologies Used**
- Next.js: **For building server-side rendered and statically generated React applications.**
- yup: **For schema validation and form input validation.**
- Redux Toolkit: **To manage the application's global state effectively.**
- json-server: **To simulate a backend API for rapid development and testing.**
- bcrypt: **For securely hashing passwords to enhance authentication security.**
- jose: **To handle JSON Web Tokens (JWT) for secure user authentication and authorization.**

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/mahmoudhammad309/next.js-e-commerce-task
```

### **2. Install Dependencies**

#### Front-End:
```bash
npm install
```


### **5. Run the App**
#### json-server:
```bash
npm run server
```
Access the server at `http://localhost:5000/`

#### Front-End:
```bash
npm run dev
```
Access the client at `http://localhost:3000/`

## **Future Enhancements**
- Implement advanced filtering, sorting, and pagination for products.
- Add a complete shopping cart and checkout flow.
- Integrate testing using Jest or Cypress.

---
