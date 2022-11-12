import React from 'react';
import cl from './Task.module.scss'
import Checkmark from '../Сheckmark/Сheckmark'


import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import {useContext, useMemo} from 'react'
import {Context} from '../../../index.js'
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import edit from '../../../images/edit.png'

import { Draggable } from 'react-beautiful-dnd';
const Task = ({children, tasks, task, step, handleDelete,checkClickHandler, ...props}) => {
	// const img = <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
	const cross = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
	const {auth, firestore} = useContext(Context)
	console.log(`render comp ${step}`)
	const [user] = useAuthState(auth)
	const a = user.uid
	// const tasks = []
	const ref = doc(firestore, 'users', `${a}`);
	// getDoc(ref).then(res=>console.log(res.data().tasks))
	const [userData, loading, error, snapshot] = useDocumentData(ref)

	return (
		<Draggable draggableId={`${task.id}`} index={step}>
		{provided=>(
			<div className={cl.task}  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
				<Checkmark isActive={task.isActive} onClick={()=>checkClickHandler(step)} className={cl.mark}/>
				<div style={task.isActive?{}:{textDecoration:'solid line-through grey 1.5px'}} className={cl.text}>{children}</div>
				<button className={cl.edit}><img src={edit}></img></button>
				<button className={cl.cross} onClick={()=>handleDelete(step)}>{cross}</button>
			</div>
		)}
		</Draggable>	
	);
};

export default Task;