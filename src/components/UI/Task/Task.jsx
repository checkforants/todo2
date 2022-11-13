import React, {useState, useEffect} from 'react';
import cl from './Task.module.scss'
import Checkmark from '../Сheckmark/Сheckmark'


import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import {useContext, useMemo} from 'react'
import {Context} from '../../../index.js'
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import edit from '../../../images/edit.png'

import { Draggable } from 'react-beautiful-dnd';
import Edit from './../EditSVG/Edit';
const Task = ({setEditingTaskNumber, children, tasks, task, step, handleDelete,checkClickHandler, editingTaskNumber, firebaseRef, ...props}) => {
	// const img = <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
	const cross = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth)
	const [inputEditingTaskValue, setInputEditingTaskValue]=useState('')

	const handleEdit=(ind)=>{
		if (editingTaskNumber===ind){
			console.log(editingTaskNumber);
			setEditingTaskNumber('')
			let tasks = [...userData.tasks]
			console.log(tasks);
			tasks[ind].text = inputEditingTaskValue
			let obj =  {...userData, tasks:tasks}
			setDoc(ref, obj)
		}else{
			setEditingTaskNumber(ind)
		}
	}
	const a = user.uid
	// const tasks = []
	const ref = doc(firestore, 'users', `${a}`);
	// getDoc(ref).then(res=>console.log(res.data().tasks))
	const [userData, loading, error, snapshot] = useDocumentData(ref)
	useEffect(() => {
		setInputEditingTaskValue(children)
	}, [editingTaskNumber]);
	return (
		<Draggable draggableId={`${task.id}`} index={step}>
		{provided=>(
			
				<div className={cl.task}  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<Checkmark isActive={task.isActive} onClick={()=>checkClickHandler(step)} className={cl.mark}/>
					{editingTaskNumber!==step
						?<div style={task.isActive?{}:{textDecoration:'solid line-through grey 1.5px'}} className={cl.text}>{children}</div>
						:<input className={cl.text} value={inputEditingTaskValue} onChange={(e)=>setInputEditingTaskValue(e.target.value)}></input>}
					<Edit color={editingTaskNumber!==step?"#7480a4":'#32CD32'} handleEdit={()=>handleEdit(step)}></Edit>
					<button className={cl.cross} onClick={()=>handleDelete(step)}>{cross}</button>
				</div>
		)}
		</Draggable>	
	);
};

export default Task;