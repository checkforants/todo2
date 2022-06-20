import React from 'react';
import cl from './ModalDialog.module.scss'
const ModalDialog = ({modalVisible,setModalVisible,clearCompleted, eng, ...props}) => {
	return (
		<div className={modalVisible?cl.modalDialog+' '+cl.visible:cl.modalDialog} onClick={()=>setModalVisible(prev=>!prev)}>
			<div className={cl.content}  onClick={(e)=>{e.stopPropagation()}}>
				<div>{eng?'Are you sure?':'Вы уверены'}</div>
				<div className={cl.btns} >
					<button onClick={()=>{setModalVisible(false); clearCompleted()}}>{eng?'Yes':'Да'}</button>
					<button onClick={()=>{setModalVisible(false)}}>{eng?'No':'Нет'}</button>
				</div>
			</div>
		</div>
	);
};

export default ModalDialog;