var BigRedButton	= BigRedButton	|| {}

BigRedButton.WebAudio	= function(){
	this.report	= report
	
	report.webAudio	= []

	this.log	= function(userData){
		var item	= {}
		// from detector.js	https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
		item.isSupported	= (window.AudioContext || window.webkitAudioContext) ? true : false
		// put the report
		report.webAudio.push(item)
	}
}


