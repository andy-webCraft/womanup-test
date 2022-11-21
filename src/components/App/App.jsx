import React from "react";
import { useFirebaseApp, FirestoreProvider, StorageProvider } from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import TodoList from "../TodoList/TodoList";

import "./App.less";

/** @module App */

/** Корневой компонент приложения */
const App = () => {
  /** Инициализация firebase */
  const firestoreApp = getFirestore(useFirebaseApp());

  /** Инициализация хранилища firebase */
  const firebaseStorage = getStorage();

  return (
    <FirestoreProvider sdk={firestoreApp}>
      <StorageProvider sdk={firebaseStorage}>
        <main className="app">
          <h1>TodoList</h1>
          <TodoList />
        </main>
      </StorageProvider>
    </FirestoreProvider>
  );
};

export default App;
