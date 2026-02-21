# 🩸 Blood Donation Management System

A Blood Donation Management System designed using relational and non-relational database models.

This project was developed as part of a Database Design & Implementation Micro Project (2025–2026).

---

## 📌 Project Overview

The system manages:

• User Registration & Authentication  
• Role-Based Access Control (Admin, Donor, Recipient, Hospital Staff)  
• Donor Management & Eligibility Tracking  
• Blood Inventory Management  
• Hospital Partnerships  
• Blood Request & Fulfillment Workflow  
• Emergency Priority System  
• Audit Logging  
• Database Hosting (Supabase - PostgreSQL)  
• NoSQL Migration (MongoDB)

---

## 🏗 Database Technologies Used

| Database | Purpose |
|----------|---------|
| MySQL | Initial relational database design |
| PostgreSQL (Supabase) | Cloud hosted relational database |
| MongoDB Atlas | NoSQL migration |

---

## 🧱 System Architecture

Frontend → Backend API → Database

The database design follows:

• Fully Normalized (Up to 3NF)  
• Proper Foreign Key Constraints  
• Indexed Columns for Fast Search  
• Secure Password Storage (Hashed Passwords)  
• Scalable Structure for Millions of Users  

---

## 📊 Core Tables

• roles  
• users  
• donors  
• recipients  
• hospitals  
• blood_inventory  
• blood_requests  
• donations  
• audit_logs  
• districts  
• blood_groups  

---

## 🔎 Features Implemented

### 🔐 Secure Authentication
- Password stored as hash
- Unique email & phone
- Role-based access control

### 🩸 Donor Management
- Blood group tracking
- District-based filtering
- Eligibility status
- Emergency availability

### 🏥 Hospital & Inventory
- Real-time stock tracking
- Unique blood group per hospital

### 🚨 Emergency Request System
- Priority levels: NORMAL / URGENT / CRITICAL
- Request status workflow

### 📈 Optimization
- Indexed search on blood group + district
- Indexed priority for emergency sorting
- Optimized joins

---

## 🧪 Sample Advanced Queries

Search eligible donors by blood group and district:

```sql
SELECT u.full_name, bg.group_name, d.district_name
FROM donors dn
JOIN users u ON dn.user_id = u.user_id
JOIN blood_groups bg ON dn.blood_group_id = bg.blood_group_id
JOIN districts d ON dn.district_id = d.district_id
WHERE dn.is_eligible = TRUE
AND bg.group_name = 'O+'
AND d.district_name = 'Thiruvananthapuram';
