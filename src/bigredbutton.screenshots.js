var BigRedButton	= BigRedButton	|| {}

BigRedButton.Screenshots	= function(report, callback){
	callback	= callback	|| function(){}
	this.report		= report
	report.screenshots	= []
	
	this.logCanvas	= function(canvas, userData){
		var dataUrl	= canvas.toDataURL()
		return this.logDataUrl(dataUrl, userData)
	}

	this.logDataUrl	= function(dataUrl, userData){
		// create the item to log
		var item	= {
			createdAt	: Date(),
			dataUrl		: dataUrl,
		}
		// add userData if present
		if( userData )	item.userData	= userData
		// add item into the log
		report.screenshots.push(item)
		// notify the callback if needed
		callback()
	}
}
