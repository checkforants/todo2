import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppRouter from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext } from 'react';
import { getDatabase } from "firebase/database";
import { getStorage} from "firebase/storage";




import {themeReducer} from './reducers/themeReducer'
import { langReducer } from './reducers/langReducer';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
	apiKey: "AIzaSyDKCXycGDqQY9p_Z8AOmME8OID9VJR8nU8",
	authDomain: "chat-fc5b9.firebaseapp.com",
	databaseURL: "https://ics2-abcd9-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "chat-fc5b9",
	storageBucket: "chat-fc5b9.appspot.com",
	messagingSenderId: "453867670088",
	appId: "1:453867670088:web:df1021368474d4357e667d",
	measurementId: "G-KLWDMGJW6W"
  });

const auth = firebase.auth()

const firestore = firebase.firestore()
// const database = getDatabase(app)
// const storage = getStorage(app)
export const Context = createContext(null)
// Initialize Firebase

// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));


const rootReducer = combineReducers({
	theme: themeReducer,
	lang: langReducer,
})
const store = createStore(rootReducer);

root.render(
	<Context.Provider value={{
		firebase,
		auth,
		firestore
	}}>
		<Provider store={store} >
			<App />	
		</Provider>
	</Context.Provider>
);

