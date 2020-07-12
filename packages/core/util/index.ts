/*
 get Node.js global Variable
*/
export function getGlobalVariable(): any {
	return window;
}

export function capitalize(word){
	return word[0].toUpperCase()+word.slice(1).toLowerCase();
}