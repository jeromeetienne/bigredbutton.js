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

## errorreport.console.js

It logs each calls of console API, thus you can study it later.
It indirect usual calls like ```console.log``` and co, ```console.assert()``` 

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

## errorreport.webaudio.js

It logs the webaudio api capability of the browser.

## errorreport.webgl.js

It logs the webgl capability of the browser.

# Limitations

Currently it is running in modern browsers. node.js will be supported in the future. 

