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

var BigRedButton	= BigRedButton	|| {}

BigRedButton.Builder	= function(report){
	report		= report	|| {}
	
	report.createAt	= Date()
	
	//////////////////////////////////////////////////////////////////////////////////
	//		errorreport.console.js						//
	//////////////////////////////////////////////////////////////////////////////////
		
	var reportConsole	= new BigRedButton.ConsoleCalls(report)
	this.consoleCalls	= reportConsole
	
	//////////////////////////////////////////////////////////////////////////////////
	//		errorreport.screenshots.js					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var reportScreenshots	= new BigRedButton.Screenshots(report)
	this.screenshots	= reportScreenshots

	//////////////////////////////////////////////////////////////////////////////////
	//		errorreport.performanceapi.js					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var reportPerformanceAPI	= new BigRedButton.PerformanceAPI(report)
	reportPerformanceAPI.log('super performance')
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	

	this.log	= function(userData){
		reportPerformanceAPI.log(userData)
		
	}
}
var BigRedButton	= BigRedButton	|| {}

BigRedButton.ConsoleCalls= function(report, callback){
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

var BigRedButton	= BigRedButton	|| {}

BigRedButton.PerformanceAPI	= function(report, callback){
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
var BigRedButton	= BigRedButton	|| {}

BigRedButton.Userdata	= function(report){
	// up to you to put whatever you want in there
	report.userData	= {}
}

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


var BigRedButton	= BigRedButton	|| {}

/**
 * kudos to http://webglreport.com
 */
BigRedButton.WebGl	= function(report){
	this.report	= report
	
	report.webgl	= []
	
	this.log	= function(userData){
		var item	= {}
		// from detector.js	https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
		item.isSupported= (function (){
			try {
				var canvas = document.createElement( 'canvas' );
				return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
			}catch( e ){
				return false;
			}
		})() ? true : false

		if( item.isSupported ){
			var canvas	= document.createElement( 'canvas' );
			var contextName	= 'experimental-webgl'
			var gl		= canvas.getContext( contextName )
		}

		if( item.isSupported ){
			// get parameter like webglreport
			// - from http://webglreport.com/ http://webglreport.com/webglreport.js
			// - the one from webglstats itself
			// - view-source:http://cdn.webglstats.com/statframe.html
			
			item.info = {
				glVersion: gl.getParameter(gl.VERSION),
				shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
				vendor: gl.getParameter(gl.VENDOR),
				renderer: gl.getParameter(gl.RENDERER),
				antialias:  gl.getContextAttributes().antialias ? 'Available' : 'Not available',
				angle: getAngle(gl),
				majorPerformanceCaveat: getMajorPerformanceCaveat(contextName),
				redBits: gl.getParameter(gl.RED_BITS),
				greenBits: gl.getParameter(gl.GREEN_BITS),
				blueBits: gl.getParameter(gl.BLUE_BITS),
				alphaBits: gl.getParameter(gl.ALPHA_BITS),
				depthBits: gl.getParameter(gl.DEPTH_BITS),
				stencilBits: gl.getParameter(gl.STENCIL_BITS),
				maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
				maxCombinedTextureImageUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
				maxCubeMapTextureSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
				maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
				maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
				maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
				maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
				maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
				maxVertexTextureImageUnits: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
				maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
				aliasedLineWidthRange: describeRange(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)),
				aliasedPointSizeRange: describeRange(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)),
				maxViewportDimensions: describeRange(gl.getParameter(gl.MAX_VIEWPORT_DIMS)),
				maxAnisotropy: getMaxAnisotropy(),
				extensions: gl.getSupportedExtensions(),
				vertexShaderBestPrecision: getBestFloatPrecision(gl.VERTEX_SHADER),
				fragmentShaderBestPrecision: getBestFloatPrecision(gl.FRAGMENT_SHADER),
				fragmentShaderFloatIntPrecision: getFloatIntPrecision(gl),
				draftExtensions: getDraftExtensions()
			}
		}

		// add userData if present
		if( userData )	item.userData	= userData

		report.webgl.push(item)
	
		return;

		//////////////////////////////////////////////////////////////////////////////////
		//		function from webreport.jshttp://webglreport.com/webglreport.js	//
		//////////////////////////////////////////////////////////////////////////////////
		
		function getMajorPerformanceCaveat(contextName) {
			var canvas	= document.createElement( 'canvas' );
			canvas.width	= 1
			canvas.height	= 1
			document.body.appendChild(canvas)
			var gl		= canvas.getContext( contextName, { failIfMajorPerformanceCaveat : true })
		
			canvas.parentNode.removeChild(canvas)

			if (!gl) {
				// Our original context creation passed.  This did not.
				return 'Yes';
			}

			if (typeof gl.getContextAttributes().failIfMajorPerformanceCaveat === 'undefined') {
				// If getContextAttributes() doesn't include the failIfMajorPerformanceCaveat
				// property, assume the browser doesn't implement it yet.
				return 'Not implemented';
			}

			return 'No';
		}

		function describeRange(value) {
			return [value[0], value[1]];
		}

		function getMaxAnisotropy() {
			var e = gl.getExtension('EXT_texture_filter_anisotropic')
				|| gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
				|| gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

			if (e) {
				var max = gl.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
				// See Canary bug: http://code.google.com/p/chromium/issues/detail?id=117450
				if (max === 0) {
					max = 2;
				}
				return max;
			}
			return null;
		}

		function formatPower(exponent, verbose) {
			if (verbose) {
				return '' + Math.pow(2, exponent);
			} else {
				return '2<sup>' + exponent + '</sup>';
			}
		}

		function getPrecisionDescription(precision, verbose) {
			return { 
				rangeMin	: formatPower(precision.rangeMin, verbose),
				rangeMax	: formatPower(precision.rangeMax, verbose),
				precision	: precision.precision,
			}
		}
		function getBestFloatPrecision(shaderType) {
			var high = gl.getShaderPrecisionFormat(shaderType, gl.HIGH_FLOAT);
			var medium = gl.getShaderPrecisionFormat(shaderType, gl.MEDIUM_FLOAT);
			var low = gl.getShaderPrecisionFormat(shaderType, gl.LOW_FLOAT);

			var best = high;
			if (high.precision === 0) {
				best = medium;
			}

			return {
				high	: getPrecisionDescription(high, true),
				medium	: getPrecisionDescription(medium, true),
				low	: getPrecisionDescription(low, true),
			}
		}

		function getFloatIntPrecision(gl) {
			var high	= gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
			high		= gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT);

			var s		=  (high.precision !== 0) ? 'highp/' : 'mediump/';
			s		+= (high.rangeMax !== 0) ? 'highp' : 'lowp';

			return s;
		}
    
		function isPowerOfTwo(n) {
			return (n !== 0) && ((n & (n - 1)) === 0);
		}

		function getAngle(gl) {
			var lineWidthRange = describeRange(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE));

			// Heuristic: ANGLE is only on Windows, not in IE, and does not implement line width greater than one.
			var angle	= (navigator.platform === 'Win32') && 
						(gl.getParameter(gl.RENDERER) !== 'Internet Explorer') && 
						(lineWidthRange === describeRange([1,1]))

			if (angle) {
				// Heuristic: D3D11 backend does not appear to reserve uniforms like the D3D9 backend, e.g.,
				// D3D11 may have 1024 uniforms per stage, but D3D9 has 254 and 221.
				//
				// We could also test for WEBGL_draw_buffers, but many systems do not have it yet
				// due to driver bugs, etc.
				if (isPowerOfTwo(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)) && isPowerOfTwo(gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))) {
					return 'Yes, D3D11';
				} else {
					return 'Yes, D3D9';
				}
			}

			return 'No';
		}

		function getDraftExtensions() {
			if (navigator.userAgent.indexOf('Chrome') !== -1) {
				return 'To see draft extensions in Chrome, browse to about:flags, enable the "Enable WebGL Draft Extensions" option, and relaunch.';
			} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
				return 'To see draft extensions in Firefox, browse to about:config and set webgl.enable-draft-extensions to true.';
			}
			return '';
		}
	}	
}

