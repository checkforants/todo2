import React, {useState} from 'react';
import cl from './Task.module.scss'
import Checkmark from '../Сheckmark/Сheckmark'
import {useContext, useMemo} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth';
import {Context} from '../../../index'
import { doc, deleteDoc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { is } from '@react-spring/shared';
const InputTask = ({isDarkTheme, userData,...props}) => {
	
	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth)
	let idd = serverTimestamp()


	const [value, setValue] = useState('');

	async function handleClick(){
		console.log(value.length);
		if (value.length==0){
			alert('0!')
			return
		}
		else{
		let obj =  {...userData, tasks:[...userData.tasks, {id:Date.now(), text: value, isActive:true}]}
		
		const a = user.uid
		const ref = doc(firestore, 'users', `${a}`);
		setValue('')
		await setDoc(ref, obj)}
		
	}

	
	// const clName = isDarkTheme? cl.taskInput:cl.taskInput+' '+cl.taskInputLight

	return (
		<div  className={isDarkTheme? cl.taskInput:cl.taskInput+' '+cl.lightTaskInput} style={{marginBottom:'20px'}}>
			<input onChange={(e)=>{setValue(e.target.value)}} value={value}></input>
			<Checkmark  className={cl.mark} onClick={()=>handleClick()}/>
		</div>
	);
};

export default InputTask;