# 🛍️ App Madeira Madeira

React Native application to consume the [Fake Store API](https://fakestoreapi.com/docs) with catalog and shopping cart features.

## 📋 Prerequisites

- **Node.js**: >= 18.0.0
- **npm** or **yarn**
- **React Native CLI**
- **Xcode** (for iOS)
- **Android Studio** (for Android)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/rafaelsos/mini-ecommerce
cd app_madeiramadeira
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install iOS dependencies (iOS only)
```bash
cd ios && pod install && cd ..
```

## 🏃‍♂️ Running the Project

### 1. Start the Metro bundler
```bash
npx react-native start --reset-cache
```

### 2. Run on iOS
```bash
npx react-native run-ios
```

### 3. Run on Android
```bash
npx react-native run-android
```

## 🧪 Tests

To run tests:
```bash
npm test
```

## 📁 Project Structure

```
src/
├── features/
│   ├── cart/           # Cart features
│   └── catalog/        # Catalog features
├── shared/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   ├── infra/         # HTTP configurations
│   ├── routes/        # Navigation
│   ├── store/         # Global state (Redux)
│   ├── theme/         # Application theme
│   └── index.ts
└── index.ts
```

## 🛠️ Technologies Used

- **React Native** 0.80.1
- **TypeScript** 5.0.4
- **@reduxjs/toolkit** - State management
- **@tanstack/react-query** - Data caching and synchronization
- **@react-navigation** - Navigation
- **Redux Persist** - State persistence

## 📊 Main Features

### Global State (Redux Toolkit)
- Shopping cart management
- Data persistence
- Organized actions and reducers

### Data Caching (React Query)
- Smart product caching
- Automatic synchronization
- Loading and error states

### Navigation
- Bottom tabs
- Stack navigation
- Typed navigation
