# 📋 React Native Todo App with Redux Toolkit

A simple and intuitive Todo application built using **React Native** and **Redux Toolkit** for state management.

## 🚀 Features

- Add new todos  
- Mark todos as completed  
- Delete todos  
- Uses Redux Toolkit with slices and store  
- State managed globally

## 🛠 Tech Stack

- React Native (Expo or CLI)
- Redux Toolkit
- React Redux
- TypeScript (if used)

## 📂 Project Structure

/ThirdNative
├── package.json
├── README.md
└── /src
    ├── /navigation
    │   └── RootNavigation.tsx
    ├── /screens
    │   └── TaskList.tsx
    └── /store
        ├── store.ts
        └── taskSlice.ts



## ⚙️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/dedJack/ThirdNative.git
   cd ThirdNative
   
2. Install dependencies

```bash
   npm install
```

3. Run the app

```
   npm start
   npx react-native run-android
 ```

🧠 Redux Toolkit Overview
The app uses Redux Toolkit to manage global state in a simple and scalable way. The taskSlice defines actions and reducers, while the store combines them and is provided at the root level of the app.

👨‍💻 Author
myself – @dedJack

