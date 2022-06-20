const initialThemeState = {
	isDarkTheme:true
  };
export  function themeReducer(state = initialThemeState, action){
	if (action.type === 'CHANGE'){
		return {
			isDarkTheme: !state.isDarkTheme
		}
	}
	return state;
}