# 📡 API Documentation

## Base URL

### Local

```text
http://127.0.0.1:8000/api/
```

### Production

```text
https://expense-approval-system-backend.onrender.com/api/
```

---

# Authentication

The application uses **JWT (JSON Web Token)** authentication.

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

---

# Authentication APIs

## Login

**POST**

```
/auth/login/
```

### Request

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Response

```json
{
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
}
```

---

## Refresh Token

**POST**

```
/auth/token/refresh/
```

### Request

```json
{
  "refresh": "<refresh_token>"
}
```

### Response

```json
{
  "access": "<new_access_token>"
}
```

---

# Dashboard APIs

## Employee Dashboard

**GET**

```
/dashboard/employee/
```

Returns:

- Total Claims
- Pending Claims
- Approved Claims
- Rejected Claims
- Total Amount
- Recent Claims

---

## Admin Dashboard

**GET**

```
/dashboard/admin/
```

Returns:

- Total Employees
- Total Categories
- Total Claims
- Pending Claims
- Approved Claims
- Rejected Claims
- Recent Claims

---

# Employee APIs

## List Employees

**GET**

```
/employees/
```

---

## Create Employee

**POST**

```
/employees/
```

### Request

```json
{
  "username": "john",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "department": "IT",
  "designation": "Developer",
  "role": "EMPLOYEE",
  "password": "password123"
}
```

---

## Update Employee

**PUT**

```
/employees/{id}/
```

---

## Delete Employee

**DELETE**

```
/employees/{id}/
```

---

# Category APIs

## List Categories

**GET**

```
/categories/
```

---

## Create Category

**POST**

```
/categories/
```

Example

```json
{
  "name": "Travel",
  "description": "Travel expenses",
  "max_amount": 5000
}
```

---

## Update Category

**PUT**

```
/categories/{id}/
```

---

## Delete Category

**DELETE**

```
/categories/{id}/
```

---

# Expense Claim APIs

## List Claims

**GET**

```
/claims/
```

Supports

- Search
- Status Filter
- Category Filter

Example

```
/claims/?search=food&status=APPROVED
```

---

## Create Claim

**POST**

```
/claims/
```

Example

```json
{
  "title": "Taxi",
  "description": "Airport pickup",
  "amount": 450,
  "expense_date": "2026-06-28",
  "category": 1
}
```

---

## Update Claim

**PUT**

```
/claims/{id}/
```

---

## Delete Claim

**DELETE**

```
/claims/{id}/
```

Only Draft claims can be deleted.

---

## Submit Claim

**POST**

```
/claims/{id}/submit/
```

Changes claim status from **Draft** to **Submitted**.

---

## Approve Claim

**POST**

```
/claims/{id}/approve/
```

Changes claim status to **Approved**.

---

## Reject Claim

**POST**

```
/claims/{id}/reject/
```

### Request

```json
{
  "comments": "Receipt is missing."
}
```

Changes claim status to **Rejected**.

---

# Status Workflow

```
Draft
   │
Submit
   ▼
Submitted
   │
 ┌───────┴────────┐
 │                │
 ▼                ▼
Approved      Rejected
                    │
                    ▼
             Edit Claim
                    │
               Resubmit
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 204  | Deleted Successfully  |
| 400  | Validation Error      |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

# Demo Credentials

| Role          | Username | Password    |
| ------------- | -------- | ----------- |
| Administrator | admin    | admin123    |
| Employee      | employee | employee123 |

---

# Technologies

- Django REST Framework
- JWT Authentication
- React + Vite
- SQLite
- Render
- Vercel
