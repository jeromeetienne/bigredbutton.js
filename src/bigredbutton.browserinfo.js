var BigRedButton	= BigRedButton	|| {}

BigRedButton.BrowserInfo	= function(report){
	this.report	= report

	report.browserInfos	= []
	this.log	= function(userData){
		var item	= {
			createdAt	: Date(),
			userAgent	: navigator.userAgent,
			plateform	: navigator.platform,
			windowSize	: {
				innerWidth	: window.innerWidth,
				innerHeight	: window.innerHeight,
			},
			screen		: JSON.parse(JSON.stringify(window.screen)),
		}
		// add userData if present
		if( userData )	item.userData	= userData
		// put the report
		report.browserInfos.push(item)
	}
}

