import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate  } from "react-router-dom";
import AppRouter from './components/AppRouter';
import UpTitle from './components/UI/UpTitle/UpTitle';
import DownTools from './components/DownTools/DownTools';

import {themeReducer} from './reducers/themeReducer'
import { langReducer } from './reducers/langReducer';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { connect } from 'react-redux';
function App(props) {

	// const [isDarkTheme, setIsDarkTheme] = useState(true);
	// if (isDarkTheme){
	// 	cl = 'app dark'
	// }
	

  return (

		<div className={props.isDarkTheme?'app dark':'app light'}>
			
			<BrowserRouter>
			<UpTitle></UpTitle>
				<AppRouter/>
				<DownTools></DownTools>
			</BrowserRouter>
			
		</div>
  );
}

function mapStateToProps(state) {

	return {
		lang: state.lang.lang,
		isDarkTheme: state.theme.isDarkTheme
	};
  }
export default connect(mapStateToProps)(App);

