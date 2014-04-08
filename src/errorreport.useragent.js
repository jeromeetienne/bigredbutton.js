var ErrorReport	= ErrorReport	|| {}

ErrorReport.UserAgent	= function(report){
	this.report	= report

	report.userAgents	= []
	this.log	= function(userData){
		var item	= {
			userAgent	: navigator.userAgent,
			plateform	: navigator.plateform,
		}
		// add userData if present
		if( userData )	item.userData	= userData
		// put the report
		report.userAgents.push(item)
	}
}

