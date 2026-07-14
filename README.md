# POS System Client

<p align="center">

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-UI-009688?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.x-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Node.js Backend](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![DevOps Learning](https://img.shields.io/badge/Project-DevOps%20Learning-blueviolet?style=for-the-badge)

</p>

An Angular-based frontend for a **Point of Sale (POS) System** that provides customer, product, and order management through a secure authenticated dashboard.

This project is part of a **full-stack DevOps learning journey**. Rather than focusing only on frontend development, it uses a realistic business application to practice modern DevOps concepts such as containerization, CI/CD pipelines, deployment automation, and cloud infrastructure.

> **Frontend Repository**  
> https://github.com/Osagani31/POS_System_client

> **Backend Repository**  
> https://github.com/Osagani31/POS-System-Devops



# 📖 About

This repository contains the **Angular frontend** of the POS System.

The application communicates with a separate **Node.js + Express REST API** backed by MongoDB.

The frontend includes:

- Secure authentication
- Customer management
- Product management
- Order management
- Angular Material dashboard
- JWT-based authorization
- Route protection
- Loading indicator
- Responsive UI

The overall project is designed to simulate a real-world application that can be containerized, tested, deployed, and maintained using modern DevOps practices.



# 🏗️ System Architecture

```text
                     Angular 19 Frontend
                (Standalone Components SPA)
                             │
                  HTTP + JSON REST API
                             │
                             ▼
                 Node.js + Express Backend
                  JWT Authentication Layer
                             │
                             ▼
                      MongoDB Database
```



# 🎯 Project Goals

This application serves as a practical environment for learning and implementing DevOps practices, including:

- Docker containerization
- Multi-stage Docker builds
- Docker Compose
- CI/CD pipelines
- GitHub Actions
- Environment configuration
- Reverse proxy with Nginx
- HTTPS deployment
- Cloud deployment
- Infrastructure automation
- Monitoring and logging

Instead of deploying a simple demo project, this repository uses a realistic business application to practice production-ready workflows.



# 🛠️ Tech Stack

## Frontend

- Angular 19
- TypeScript
- Angular Material
- Angular CDK
- RxJS
- Angular HttpClient
- Standalone Components
- Karma
- Jasmine

## Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT Authentication
- dotenv



# ✨ Features

## Authentication

- User Login
- User Registration
- JWT Authentication
- Cookie-based session management
- Protected routes using Angular Route Guards
- Automatic token attachment using HTTP Interceptor



## Dashboard

- Responsive layout
- Navigation toolbar
- User menu
- Protected dashboard



## Customer Management

- View customers
- Create customers
- Edit customers
- Delete customers
- Material Data Table
- Pagination
- Sorting
- Dialog-based forms



## Product Management

- View products
- Add products
- Update products
- Delete products


## Order Management

- View orders
- Create orders



## Shared Features

- Global loading spinner
- HTTP loading interceptor
- Route Guards
- 404 Page



# 📂 Project Structure

```text
src/
├── app/
│
├── components/
│   └── loading/
│
├── guards/
│   └── auth.guard.ts
│
├── interceptor/
│   └── http-manager.interceptor.ts
│
├── pages/
│   ├── login/
│   ├── signup/
│   ├── dashboard-context/
│   ├── dashboard-customer-page/
│   ├── dashboard-product-page/
│   ├── dashboard-orders-page/
│   └── notfound/
│
├── services/
│   ├── auth.service.ts
│   ├── customer.service.ts
│   ├── cookie-manager.service.ts
│   └── loading-status.service.ts
│
├── app.routes.ts
└── app.config.ts

environments/
├── environment.ts
└── environment.development.ts
```



# 📋 Prerequisites

Install the following software before running the project.

- Node.js (LTS)
- Angular CLI v19

```bash
npm install -g @angular/cli
```

You must also have the backend API running.

Backend Repository

https://github.com/Osagani31/POS-System-Devops



# 🚀 Getting Started

## 1. Clone the frontend

```bash
git clone https://github.com/Osagani31/POS_System_client.git
cd POS_System_client
```



## 2. Install dependencies

```bash
npm install
```



## 3. Configure the API URL

Update

```text
src/environments/environment.development.ts
```

Example

```typescript
export const environment = {
  baseUrl: "http://localhost:3000"
};
```

For production builds, update

```text
src/environments/environment.ts
```



## 4. Clone and run the backend

```bash
git clone https://github.com/Osagani31/POS-System-Devops.git
```

Navigate to the backend project.

```bash
cd "POS-System-Devops/POS System-Devops"
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
SERVER_PORT=3000
MONGO_URI=mongodb://localhost:27017/pos_system_devops
JWT_SECRET=your_jwt_secret_here
```

Run the server.

```bash
node index.js
```

The backend will be available at

```
http://localhost:3000
```



## 5. Start the Angular application

```bash
ng serve
```

Open

```
http://localhost:4200
```



# 🧪 Running Tests

Run unit tests.

```bash
ng test
```

Testing Frameworks

- Karma
- Jasmine



# 📦 Production Build

Build the application.

```bash
ng build
```

The optimized production files will be generated inside

```
dist/
```



# 🔗 Backend API

The frontend communicates with a REST API built using:

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT Authentication

Repository

https://github.com/Osagani31/POS-System-Devops



## Authentication

```
POST /user/signup
POST /user/login
```



## Customers

```
POST   /customer/create
PUT    /customer/update/:id
DELETE /customer/delete/:id
GET    /customer/find-by-id/:id
GET    /customer/load-all
```



## Products

```
POST   /product/create
PUT    /product/update/:id
DELETE /product/delete/:id
GET    /product/find-by-id/:id
GET    /product/load-all
```



## Orders

```
POST /order/create
GET  /order/find-all
```

Protected endpoints require

```
Authorization: Bearer <JWT_TOKEN>
```

The Angular HTTP Interceptor automatically attaches the JWT token to every authenticated request.



# 🚀 DevOps Roadmap

The long-term objective of this project is to implement modern DevOps practices around a real-world full-stack application.

Planned improvements include:

- [ ] Multi-stage Docker build for Angular
- [ ] Docker Compose for frontend, backend and MongoDB
- [ ] GitHub Actions CI pipeline
- [ ] Automated testing
- [ ] Automated Docker image publishing
- [ ] Deployment to cloud infrastructure
- [ ] Environment-specific configuration
- [ ] Reverse proxy using Nginx
- [ ] HTTPS configuration
- [ ] Monitoring and logging
- [ ] Infrastructure as Code



# 📦 Related Repositories

## POS System Client (Frontend)

**Repository**

https://github.com/Osagani31/POS_System_client

Angular 19 frontend built with Angular Material and standalone components.



## POS System DevOps (Backend)

**Repository**

https://github.com/Osagani31/POS-System-Devops

Node.js + Express + MongoDB REST API powering the frontend and serving as the primary DevOps learning project.



# 🤝 Contributing

This project is primarily intended for learning and experimentation. Suggestions, improvements, and pull requests are welcome.


# 📄 License

This project is intended for educational purposes and personal learning.
