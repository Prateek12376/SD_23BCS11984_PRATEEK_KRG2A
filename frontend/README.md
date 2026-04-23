# Amazon Clone - E-Commerce Platform

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL

## Setup Instructions

### Prerequisites
- Node.js, PostgreSQL, Git

### Backend
```bash
cd backend
npm install
# Edit .env with your PostgreSQL password
npm run seed    # seeds the database
npm run dev     # starts on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm start       # starts on port 3000
```

## Assumptions
- Default logged-in user via session ID stored in localStorage
- Flat shipping charge of ₹40
- Products seeded with sample data across 5 categories