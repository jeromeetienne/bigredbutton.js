var BigRedButton	= BigRedButton	|| {}

/**
 * detect and log js error
 */
BigRedButton.JavascriptError	= function(report, callback){
	callback	= callback	|| function(){}

	// init some variables
	report.jsErrors	= []
	// export report	
	this.report	= report

	var oldOnError;
	this.start	= function(){
		// overwrite previous handler. while still calling it at the end
		// - https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onerror
		oldOnError	= window.onerror
		window.onerror	= function myErrorHandler(message, url, line, column) {
			// insert new item
			report.jsErrors.push({
				createdAt	: Date(),
				message		: message,
				url		: url,
				line		: line,
				column		: column,
			})
			// notify user callback if needed
			callback && callback()

			// honor the previous one if any
			if( oldOnError )	oldOnError(message, url, lineNumber);

			// Just let default handler run.
			return false;
		}
	}

	/**
	 * restore previous onerror as the default one. to be called
	 * when you dont want to log js error anymore.
	 */
	this.stop	= function(){
		window.onerror	= oldOnError
		oldOnError	= null
	}
}

