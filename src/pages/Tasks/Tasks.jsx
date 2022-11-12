import React,{useState} from 'react';
import cl from './Tasks.module.scss'
import Task from '../../components/UI/Task/Task';
import InputTask from './../../components/UI/Task/InputTask';


import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import {useContext, useMemo} from 'react'
import {Context} from '../../index.js'
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import {
	CSSTransition,
	TransitionGroup,
  } from 'react-transition-group';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import {connect} from 'react-redux'
import { fontSize } from '@mui/system';
import Loader from '../../components/UI/Loader/Loader';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
const Tasks = (props) => {
	
	const {auth, firestore} = useContext(Context)
	const {editingTaskNumber, setEditingTaskNumber} = useState('')
	const [user] = useAuthState(auth)
	const a = user.uid
	const [tasks,setTasks] = useState([]);

	const ref = doc(firestore, 'users', `${a}`);
	// getDoc(ref).then(res=>console.log(res.data().tasks))
	const [userData, loading, error, snapshot] = useDocumentData(ref)
	// console.log(userData.tasks);
	const [listState, setListState] = useState('all');
	const checkClickHandler =(step, task)=>{
		let newTasks = [...userData.tasks]
		console.log(newTasks);
		newTasks[step] = {...task, isActive:task.isActive?false:true};
		let obj =  {...userData, tasks:newTasks}
		setDoc(ref, obj)
		// console.log(obj);
	}
	const handleEdit=(ind)=>{
		console.log(ind)
	}
	const handleDelete=(step)=>{
		let tasks = [...userData.tasks]
		tasks.splice(step, 1)
		let obj =  {...userData, tasks:tasks}
		setDoc(ref, obj)

		console.log(obj);
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
	  
		return result;
	  };
	const onDragEnd=(result)=>{
		if (!result.destination) {
			return;
		  }
		const items = reorder(
			userData.tasks,
			result.source.index,
			result.destination.index
		  );
		  let obj =  {...userData, tasks:items}
		  setDoc(ref, obj)
	}
	let st={}
	if (!props.isDarkTheme){
		st={backgroundColor:'white', color:'hsl(235, 24%, 19%)'}
	}
	const clearCompleted=()=>{
		// const result = window.confirm(props.lang?'Are you sure?':'Вы уверены?');
		let obj =  {...userData, tasks:userData.tasks.filter(task=>task.isActive)}
		setDoc(ref, obj);
		
	}
	const [modalVisible, setModalVisible] = useState(false);
	
	return (
		userData?
		<div className={cl.tasks}>
			<ModalDialog clearCompleted={clearCompleted} eng={props.lang} modalVisible={modalVisible} setModalVisible={setModalVisible}></ModalDialog>
			<InputTask isDarkTheme={props.isDarkTheme} userData={userData}/>
			<div  style={st} className={cl.tasksWindow}>
				<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='0'>
					{provided=>(
						<div style={st} className={cl.tasksList}
						ref={provided.innerRef}
						{...provided.droppableProps}>

							{listState=='active'?userData.tasks.map((task, step)=>{if (task.isActive){return(
									<Task checkClickHandler={()=>checkClickHandler(step, task)} step={step} handleDelete={handleDelete} tasks={userData.tasks} task = {task} key={task.id}>{task.text}</Task>

								)}})
							:listState=='completed'?userData.tasks.map((task, step)=>{if (!task.isActive){return(<Task checkClickHandler={()=>checkClickHandler(step, task)}  step={step} handleDelete={handleDelete} tasks={userData.tasks} task = {task} key={task.id}>{task.text}</Task>)}})
							:userData.tasks.map((task, step)=>{return(<Task checkClickHandler={()=>checkClickHandler(step, task)} step={step} handleDelete={handleDelete} tasks={userData.tasks} task = {task} key={task.id}>{task.text}</Task>)})}
						{provided.placeholder}
						</div>
					)}
					</Droppable>
				</DragDropContext>
			</div>
			<div style={st} className={cl.queries}>
				{userData.tasks!=={}?<div>{userData.tasks.filter(task=>task.isActive).length} {props.lang?'items left':'задани(й/я/е)'}</div>:''}
				<div  className={cl.activity}>
					<button style={st} onClick={()=>setListState('all')}>{props.lang?'All':'Все'}</button>
					<button style={st} onClick={()=>setListState('active')}>{props.lang?'Active':'В процессе'}</button>
					<button style={st} onClick={()=>setListState('completed')}>{props.lang?'Completed':'Завершённые'}</button>
				</div>
				<button onClick={()=>setModalVisible(true)} style={st}>{props.lang?'Clear completed':'Удалить завершённые'}</button>
			</div>
			
		</div>
		
		:<Loader></Loader>
	);
};
function mapStateToProps(state){
	return {
		lang: state.lang.lang,
		isDarkTheme: state.theme.isDarkTheme
	};
}
export default connect(mapStateToProps)(Tasks) ;