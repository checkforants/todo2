import React,{useContext, useEffect} from 'react';
import { Context } from '../index';
import { Routes, useLocation } from 'react-router-dom';

import {useAuthState} from 'react-firebase-hooks/auth';
import { Route, Navigate } from 'react-router-dom';
import Tasks from './../pages/Tasks/Tasks';
import Login from './../pages/Login/Login'; 
import Signup from '../pages/Signup/Signup';
import About from './../pages/About';

import { useTransition, animated,useSpringRef } from 'react-spring'

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AppRouter = (props) => {
	
	const {auth, firestore} = useContext(Context)
	const [user, usLoading, usError] = useAuthState(auth) 
	
	
	

	return (

		user?
		<Routes >
			<Route  exact path='/tasks' element={<Tasks/>}/>	
			<Route exact path='/about'  element={<About/>}/>
			<Route  path='*' element={<Navigate replace to = '/tasks'/>}/>
		</Routes>
		:<Routes>
			<Route  exact path='/login' element={<Login/>}></Route>
			<Route  exact path='/signup' element={<Signup/>}></Route>
			<Route exact path='/about'  element={<About/>}/>
			<Route  path='*' element={<Navigate replace to = '/login'/>}/>
		</Routes>

	);
};

export default AppRouter;