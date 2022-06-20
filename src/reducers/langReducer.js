const initialLangState = {
	lang:true
  };
  export function langReducer(state=initialLangState, action) {
	if (action.type === 'CHANGE_LANG'){
		return {
			lang: !state.lang
		}
	}
	return state
}