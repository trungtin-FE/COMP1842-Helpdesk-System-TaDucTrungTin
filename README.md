# Helpdesk System
### COMP1842 - Web Programming 2

---

## Student Information
- **Name:** Ta Duc Trung Tin
- **ID:** 001420076

---

## System Requirements
- Node.js (v14 or higher)
- MongoDB (installed and running)
- NPM (Node Package Manager)
- Internet connection (for CDN icons)

---

## Quick Start
### 1. MongoDB
```bash
Make sure MongoDB is running locally on mongodb://localhost:27017/helpdeskdb
```

### 2. Backend Setup
```bash
cd backend
npm run dev
```
#### Server runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm run serve
```
#### App runs on: http://localhost:8080

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/helpdesk` | Get all entries |
| POST | `/api/helpdesk` | Create new entry |
| PUT | `/api/helpdesk/:id` | Update entry |
| DELETE | `/api/helpdesk/:id` | Delete entry |
| GET | `/api/helpdesk/search?q=` | Search entries |

## Features Implemented
### 1. Core CRUD Operations
- Create new helpdesk entries (Key + Value + Category)
- Read/View all entries
- Update existing entries
- Delete entries

### 2. Additional Features
- Test Page - Quiz for staff training
- New Menu Item - "Training Quiz" page
- Third Field - "Category" (Authentication/Billing/Technical)
- Search/Filter functionality
- UI Enhancements - Bootstrap, SweetAlert2

## Technologies Used

### Backend
| Library | Purpose |
|---------|---------|
| [Express](https://expressjs.com/) | Web framework |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [Cors](https://www.npmjs.com/package/cors) | Cross-Origin Resource Sharing |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Environment variables |
| [Nodemon](https://nodemon.io/) | Auto-restart during development |

### Frontend
| Library | Purpose |
|---------|---------|
| [Vue.js](https://vuejs.org/) | Frontend framework |
| [Vue Router](https://router.vuejs.org/) | Navigation |
| [Axios](https://axios-http.com/) | HTTP client |
| [Bootstrap](https://getbootstrap.com/) | CSS framework |
| [SweetAlert2](https://sweetalert2.github.io/) | Beautiful alerts |
| [Font Awesome](https://fontawesome.com/) | Icons (CDN) |

## Contact

- **Name:** Ta Duc Trung Tin
- **Student ID:** 001420076
- **Email:** tintdtgcc230037@fpt.edu.vn

---

*Have a good day!*
