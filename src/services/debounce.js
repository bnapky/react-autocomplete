//Debounce function execution for a more efficient api interaction
//exposing a debounce function as a service enables code reusability

export default (fn, context, time) => {
  let timeout;
  let trail;
	return function() {
    let args = arguments;
		const later = () => {
      fn.apply(context, args);
			timeout = null;
    };
    
    if (!timeout) 
      timeout = setTimeout(later, time);
    else {
      clearTimeout(trail);
      trail = setTimeout(later, time);
    }

	};
}