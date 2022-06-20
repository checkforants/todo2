import React from 'react';
import cl from './DownTools.module.scss'

import { Routes, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom';

const DownTools = (props) => {
	const handleChange = () =>{
		props.dispatch({ type: 'CHANGE_LANG' });
	}
	const location = useLocation()
	console.log();
	const classs = props.isDarkTheme?cl.dark:cl.light
	return (
		<div className={cl.DT+' '+classs}>
			<select onChange={()=>handleChange()}>
				<option>{props.lang?'Eng':'Англ'}</option>
				<option>{props.lang?'Rus':'Рус'}</option>
			</select>
			{location.pathname==='/tasks'?
			<div style={{marginLeft:'-10px'}}>{props.lang?'drag&drop to reorder list':'Переместить для изменения порядка'}</div>:''}
			{location.pathname==='/about'?<Link className={cl.about} to="/tasks"> {props.lang?'To main':'На главную'}</Link>
			:<Link className={cl.about} to="/about"> {props.lang?'About':'О сайте'}</Link>}
		</div>
	);
};
function mapStateToProps(state) {
	return {
		lang: state.lang.lang,
		isDarkTheme: state.theme.isDarkTheme
	};
  }
export default connect(mapStateToProps)(DownTools);
