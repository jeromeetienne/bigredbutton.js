### ErrorReport.js

ErrorReport.js provides a simple way to produce error reports from your web applications.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.sample/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.sample/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.sample/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.sample/blob/master/examples/requirejs.html)\] :
It does that this way, and it is cool in that case.

How To Install It
=================

You can install it via script tag

```html
<script src='errorreport.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install errorreport
```

How To Use It
=============


## errorreport.creator.js

```
var reportBuild	= new ErrorReport.Builder()
reportBuild.console.start()
```

then the report is in ```reportBuild.report```.
If you want to store that on your server, you may POST it in json, or similar.

## errorreport.consolecalls.js

It logs each calls of
[console](https://developers.google.com/chrome-developer-tools/docs/console-api)
[API](http://getfirebug.com/wiki/index.php/Console_API),
thus you can study it later.
It indirect usual calls like ```console.log``` and co.

```
var report		= {}
var reportConsole	= new ErrorReport.ConsoleCalls(report)
```

To start overriding the console API, just do 

```
reportConsole.overrideConsoleAPI()
```

If you want to stop, just use 

```
reportConsole.stopOverrideConsoleAPI()
```

TODO talk about .log()

## errorreport.javascripterror.js

It logs when javascript errors occur by using [window.onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onerror).

## errorreport.screenshots.js

It logs screenshots you may do 
from your [canvas](https://developer.mozilla.org/en/docs/HTML/Canvas).
It is very useful while developing games.

## errorreport.performanceAPI.js

It logs the [performances API](https://developer.mozilla.org/en-US/docs/Web/API/Performance).

* NOTE: it isnt clear yet how to handle it in various browser

## errorreport.useragent.js

It logs the useragent of the brower it is running on.

## errorreport.userdata.js

It is a *free for all* zone. You can put in there whatever you want. It is for you, the user, to put 
your own data. It will be converted to JSON when the report is produced

```
var report		= {}
var reportUserData	= new ErrorReport.Userdata(report)
```

It will create a ```report.userData``` property in which you are free to put all your application
specific informations

## errorreport.webaudio.js

It logs the webaudio api capability of the browser.

```
var report		= {}
var reportWebAudio	= new ErrorReport.WebAudio(report)
```

It will create a ```report.webAudios``` array of logged items. 
To add a log item to it, just do

```
reportWebAudio.log('my own user data, optional')
```

A logged item looks like that

```
{
	"createAt": "Tue Apr 08 2014 18:34:02 GMT+0200 (CEST)",
	"isSupported": true,
	"userData": "my very own data"
}
```

## errorreport.webgl.js

It logs the webgl capability of the browser.

# Limitations

Currently it is running in modern browsers. node.js will be supported in the future. 

