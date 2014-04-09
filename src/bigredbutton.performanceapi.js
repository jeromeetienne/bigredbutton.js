var ErrorReport	= ErrorReport	|| {}

ErrorReport.PerformanceAPI	= function(report, callback){
	callback	= callback	|| function(){}
	report.performanceAPIs	= []
	
	/**
	 * log one
	 * - https://developer.mozilla.org/en-US/docs/Web/API/Performance
	 */
	this.log	= function(userData){
		// create the item to log
		var item	= {
			createdAt	: Date(),
			performance	: JSON.parse(JSON.stringify(performance)),
		}
		// add userData if present
		if( userData )	item.userData	= userData
		// add item into the log
		report.performanceAPIs.push(item)
		// notify the callback if needed
		callback.call(this, item)
	}
}

