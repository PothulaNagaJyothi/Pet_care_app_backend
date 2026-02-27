# 🐾 Pet Care App – Backend

## 📌 Project Overview

The Pet Care App Backend is a secure RESTful API built to manage pet health, routines, medical records, and community interaction.

It provides authenticated, user-specific access to pet data using Supabase Authentication and enforces strict ownership validation across all modules. The backend follows a modular MVC architecture to ensure scalability, maintainability, and clean separation of concerns.

This backend powers the full-stack Pet Care Application.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- Supabase (PostgreSQL + Authentication)
- JWT-based Authentication (Supabase Auth)
- Render (Deployment Platform)
- Architecture Pattern: MVC (Model-View-Controller)

---

## 📂 Folder Structure
```
backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── utils/ (optional)
└── server.js
```
**Controllers:** Business logic  
**Models:** Database interactions (Supabase queries)  
**Routes:** API route definitions  
**Middleware:** Authentication & request validation  
**Config:** Supabase client configuration

---

## 🔐 Authentication & Security
- Supabase Authentication handles user registration & login.
- Access tokens are verified in backend middleware.
- All pet-related resources enforce strict ownership validation.
- Unauthorized access attempts return 403 Forbidden.
- Consistent response structure across all endpoints.

---

## 📡 API Documentation
All protected routes require:
> Authorization: Bearer `<supabase_access_token>`

---

### 🐶 Pets
| Method | Endpoint | Description |
|---------|------------------------|------------------------------|
| POST | /api/pets | Create pet |
| GET | /api/pets | Get all pets (user-specific) |
| GET | /api/pets/:id | Get single pet |
| PUT | /api/pets/:id | Update pet |
| DELETE | /api/pets/:id | Delete pet |

---

# 💉Vaccinations
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/vaccinations/:petId |
| GET     | /api/vaccinations/:petId |
| PUT     | /api/vaccinations/:id |
| DELETE  | /api/vaccinations/:id |

---

# 🏥Appointments
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/appointments/:petId |
| GET     | /api/appointments/:petId |
| PUT     | /api/appointments/:id |
| DELETE  | /api/appointments/:id |

---

# ⚖ Weight Logs
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/weight-logs/:petId |
| GET     | /api/weight-logs/:petId |
| PUT     | /api/weight-logs/:id |
| DELETE  | /api/weight-logs/:id |

---

# 📔Health Journal
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/journal/:petId |
| GET     | /api/journal/:petId |
| PUT     | /api/journal/:id |
| DELETE  | /api/journal/:id |

---

# 🔁Routines
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/routines/:petId |
| GET     | /api/routines/:petId |
| PUT     | /api/routines/:id    |
| DELETE  | /api/routines/:id    |

---

# 🛡Insurance
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/insurance/:petId |
| GET     | /api/insurance/:petId |
| PUT     | /api/insurance/:id |
| DELETE  | /api/insurance/:id |

---

# 💊Medications
| Method | Endpoint |
|---------|------------------------------------------------|
| POST    | /api/medications/:petId |
| GET     | /api/medications/:petId |
| PUT     | /api/medications/:id |
| DELETE  | /api/medications/:id |

---

# 🚑Emergency Vets (Public)
| Method | Endpoint |
|---------|------------------------------------------------|
| GET     | /api/emergency-vets |
| GET     | /api/emergency-vets?city=CityName |
| POST    | /api/emergency-vets |
| PUT     | /api/emergency-vets/:id |
| DELETE  | /api/emergency-vets/:id |

---

# 🌍Community
| Method | Endpoint |
|---------|------------------------------------------------|
| GET     | /api/community |
| POST    | /api/community |
| GET     | /api/community/me |
| DELETE  | /api/community/:id |

---
## 🗄 Database Schema Overview

### 🧑Users (Managed by Supabase Auth)
- id
- email
- encrypted password

---

### 🐶Pets
- id
- user_id (FK → auth.users.id)
- name
- breed
- age
- weight
- medical_history
- created_at

---

### 💉Vaccinations
- id
- pet_id (FK → pets.id)
- vaccine_name
- due_date
- created_at

---

### 🏥Appointments
- id
- pet_id (FK → pets.id)
- appointment_date
- notes
- status
- created_at

---

### ⚖Weight Logs
- id
- pet_id (FK → pets.id)
- weight
- recorded_at

---

### 📔Health Journal
- id
- pet_id (FK → pets.id)
- title
- description
- created_at

---

### 🔁Routines
- id
- pet_id (FK → pets.id)
- type
- scheduled_time
- completed
- created_at

---

### 🛡Insurance
- id
- pet_id (FK → pets.id)
- provider_name
- policy_number
- coverage_details
- claim_status
- created_at

---

### 💊Medications
- id
- pet_id (FK → pets.id)
- medication_name
- dosage
- due_date
- status
- created_at

---

### 🚑Emergency Vets
- id
- name
- address
- city
- phone
- created_at

---

### 🌍Community Posts
- id
- user_id (FK → auth.users.id)
- content
- created_at

---

# ⚙️ Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-backend-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Server runs at:
``` bash
http://localhost:5000
```
---

## 🌍 Deployment

Backend is deployed on **Render**:

🔗 **Deployment Link:**  
[https://pet-care-app-backend.onrender.com](https://pet-care-app-backend.onrender.com)

---