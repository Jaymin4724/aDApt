# Project Concepts - aDApt Platform (WOC 7.0 NodeJS)

This document outlines core concepts of the aDApt student collaboration platform. Concepts are categorized as **Object**, with their **Context** and **Important Information** for functionality.

---

## 1. User
**Context:** Authentication and Access  
**Important Info:**
- Student and Admin login
- Secure password storage with hashing
- Email verification for students

---

## 2. Shared Resource Library  
**Context:** Study Material Upload/Download  
**Important Info:**
- Students upload notes, assignments
- Searchable by keywords or categories
- Real-time updates via Socket.IO

---

## 3. Q&A Manager  
**Context:** Academic Doubt Resolution  
**Important Info:**
- Post questions and answers
- Category-based sorting
- Students can request new categories
- Admin manages category list

---

## 4. Lost & Found Manager  
**Context:** Track Misplaced Items  
**Important Info:**
- Upload photos of lost items
- Tag with location categories (CEP, LT, Canteen, etc.)
- Mark as “found” or “not found”
- Auto-delete "found" items after set time
- Real-time notifications via Socket.IO

---

## 5. Admin Panel  
**Context:** Manage Platform Content  
**Important Info:**
- Manage Q&A categories
- Approve/handle user requests
- View reports of lost/found activity

---

## 6. Contact Directory  
**Context:** Access to Important Links  
**Important Info:**
- Contains email IDs and academic websites
- Searchable directory for students and admins

