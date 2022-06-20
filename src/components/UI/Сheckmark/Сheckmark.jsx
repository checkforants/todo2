import React from 'react';
import cl from './Сheckmark.module.scss'
const Сheckmark = ({isActive,...props}) => {
	const check = <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
	const clName = isActive?cl.blank:cl.filled

	// const rootCLass = [cl.mark]
	return (
		<div  {...props}>
			<div className={cl.mark+' '+clName}>{isActive?'':check}</div>
		</div>
	);
};

export default Сheckmark;