ECR Retail Application Development Hackhathon
================
1. Getting Started: Building a Chrome Extension : https://developer.chrome.com/extensions/getstarted

2. Chrome Extension Samples : https://developer.chrome.com/extensions/samples

3. Useful Samples: Samples Directory

4. Platform Requirements : 

5. Test Enviroment & Development: 

The Version of the chromium browser needs to be a newer version than 37.0.2062.94 than you are using on your development environment.
The application developers needs to package their applications as a chromium extension. This document explains details of the chromium extensions and it’s also possible to go to chromium’s : https://developer.chrome.com/extensions/getstarted web site to get more information relevant to extension development.

6. Sample Chrome Extension Manifest: 

```javascript 
{
   "content_security_policy": "script-src 'self' https://ssl.google-analytics.com https://widget.uservoice.com/; object-src 'self'",
   "description": "Flappy Bird",
   "icons": {
      "128": "flappy-bird-logo.jpeg",
      "16": "flappy-bird-logo.jpeg",
      "96": "flappy-bird-logo.jpeg"
   },
   "manifest_version": 2,
   "name": "FlappyBird",
   "permissions": [ "storage", "geolocation", "unlimitedStorage" ],
   "update_url": "http://localhost/updates.xml",
   "version": "2.8.0",
   "web_accessible_resources": [ "index.html", "flappy-bird-logo.jpeg" ]
}
```

7. Add your about info as a proper dialog/link to your application.


8 - Home Link : 
```javascript <div id="ECRHOME" style="-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;  user-select: none; z-index:1000000000; display:block; position:absolute; left:10px; top:0px; text-align:center;"><a href="chrome-extension://mdcelgbejldflfecmfpfddnaabgabofd/content/newtab.html" style="color:#FFF; padding:20px; font-size:14px; background:#333; line-height:50px; text-decoration:none;">Home</a></div> ```
