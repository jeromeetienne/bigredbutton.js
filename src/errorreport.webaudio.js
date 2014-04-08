var ErrorReport	= ErrorReport	|| {}

ErrorReport.WebAudio	= function(report){
	this.report	= report
	
	report.webAudio	= []

	this.log	= function(userData){
		var item	= {
			createAt	: Date()
		}
		// from detector.js	https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
		item.isSupported	= (window.AudioContext || window.webkitAudioContext) ? true : false
		// add userData if present
		if( userData )	item.userData	= userData
		// put the report
		report.webAudio.push(item)
		// return the added item
		return item;
	}
}


