# MongoDB Movie CRUD Lab

A backend API built with Node.js, Express, and MongoDB for managing movie and review documents.  
Implements full CRUD operations with modular file structure and robust error handling.

## ✨ Features

- Create, Read, Update, Delete operations for:
  - 🎬 Movies
  - 📝 Reviews
- Modular MongoDB connection logic
- Separation of routes, configuration, and data layers
- Express middleware integration

## 📁 Folder Structure
mongodb-movie-crud-lab/
├── app.js                 # Main server entry
├── movies.js              # Movie handlers
├── reviews.js             # Review handlers
├── mongoConnection.js     # MongoDB client setup
├── mongoCollections.js    # Collection factory
├── settings.js            # DB config
├── package.json
└── README.md

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB (Native driver)
- JavaScript (ES6)

## 🚀 Getting Started

```bash
npm install
node app.js
