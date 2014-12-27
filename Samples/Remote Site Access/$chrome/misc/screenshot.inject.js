window.onbeforeunload = function(Event){
	Event.defaultPrevented();
	Event.stopImmediatePropagation()
	Event.stopPropagation();
	//open thickbox
}	