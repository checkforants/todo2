import React from 'react';
import { connect } from 'react-redux';
const About = (props) => {
	return (
		<div>
			<div  className={props.isDarkTheme?"attribution":"attribution lightAttr"}>

				<div>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. </div>
				<div>Coded by <a target="_blank" href="https://github.com/checkforants">checkforants</a></div>
				<div>Authentication & Database : <a target="_blank" href='https://firebase.google.com/'> firebase </a></div>
				<div><a  target="_blank" href="https://www.flaticon.com/ru/free-icon/planner_7195709" title="правда иконки">Icon</a></div>
				<div> <a  target="_blank" href="https://github.com/atlassian/react-beautiful-dnd">Drag engine</a> </div>
				<div> <a   target="_blank" href="https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle">Dark Mode Toggle</a></div>
				<div><a target="_blank" href="https://icons8.com/icon/47978/редактировать">Редактировать</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></div>
			</div>

		</div>
	);
};
function mapStateToProps(state) {
	return {
		lang: state.lang.lang,
		isDarkTheme: state.theme.isDarkTheme
	};
  }
export default connect(mapStateToProps)(About);
// export default About;