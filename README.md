# Frontend Project

This is the frontend application for consuming currency quotation and authentication APIs.

## Technologies Used
- React
- TypeScript
- Vite
- Axios
- TailwindCSS
- Shadcn UI

---

## Getting Started

Follow the steps below to run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn

---

### Installation

Clone the repository:

```bash
git clone https://github.com/Tom8mths/price-tracking.git
cd price-tracking
```
### Install dependencies:

npm install
# or
yarn install

### Environmental variables

# Finance API Key (used for currency quotation)
VITE_API_KEY=your_finance_api_key_here

# Backend API URL (used for authentication and other internal services)
VITE_API_URL=http://localhost:3000/api

Backend repository available at:

https://github.com/Tom8mths/price-tracking-api

# Finance API URL (this is proxied in vite.config.ts)
VITE_FINANCE_API_URL=/api/finance

### Running the Project 

npm run dev
# or
yarn dev

# The app will be available at:

http://localhost:5173
