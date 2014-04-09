var ErrorReport	= ErrorReport	|| {}

ErrorReport.ConsoleCalls= function(report, callback){
	callback	= callback	|| function(){}
	this.start	= function(){
		console.log('not yet implemented')
	}
	
	report.consoleCalls	= []

	//////////////////////////////////////////////////////////////////////////////////
	//		log funciton							//
	//////////////////////////////////////////////////////////////////////////////////

	this.log	= function(callName, args, userData){
		// create the item to log
		var item	= {
			createdAt	: Date(),
			callName	: callName,
		}
		// add args - take care of serialisation
		try {
			item.args	= JSON.parse(JSON.stringify(args))	
		} catch(e){
			if( e instanceof TypeError ){
				// ignore the case where the arguments cant be serialized				
			}else{
				// else rethrow the exception
				throw e;
			}
		}
		// add userData if present
		if( userData )	item.userData	= userData
		// add item into the log
		report.consoleCalls.push(item)
		// notify the callback if needed
		callback()
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		overwrite console.* api						//
	//////////////////////////////////////////////////////////////////////////////////
	
	var oldConsole		= {}
	var loggedCallNames	= ['log', 'warn', 'error']
	this.overrideConsoleAPI	= function(){
		loggedCallNames.forEach(function(callName){
			// store old call
			console.assert( oldConsole[callName] === undefined )
			oldConsole[callName]	= console[callName]
			// override this call
			console[callName]	= function(){
				// log it locally
				this.log(callName, arguments)
				// forward that to the previous call
				if( oldConsole[callName] ){
					oldConsole[callName].apply(console, arguments)			
				}
			}.bind(this)			
		}.bind(this))
	}
	this.stopOverrideConsoleAPI	= function(){
		loggedCallNames.forEach(function(callName){
			// restore this call
			console[callName]	= oldConsole[callName]
			// make this call as no more overwritten
			delete oldConsole[callName]
		}.bind(this))
	}
}
