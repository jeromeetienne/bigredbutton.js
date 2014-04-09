var ErrorReport	= ErrorReport	|| {}

ErrorReport.Builder	= function(report){
	report		= report	|| {}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		errorreport.console.js						//
	//////////////////////////////////////////////////////////////////////////////////
		
	var reportConsole	= new ErrorReport.ConsoleCalls(report)
	this.consoleCalls	= reportConsole
	
	//////////////////////////////////////////////////////////////////////////////////
	//		errorreport.screenshots.js					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var reportScreenshots	= new ErrorReport.Screenshots(report)
	this.screenshots	= reportScreenshots

	//////////////////////////////////////////////////////////////////////////////////
	//		errorreport.performanceapi.js					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var reportPerformanceAPI	= new ErrorReport.PerformanceAPI(report)
	reportPerformanceAPI.log('super performance')
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	

	this.log	= function(userData){
		reportPerformanceAPI.log(userData)
		
	}
}