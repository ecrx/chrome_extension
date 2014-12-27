ECR Retail Application Development Hachathon
================
1 - Getting Started: Building a Chrome Extension : https://developer.chrome.com/extensions/getstarted

2 - Chrome Extension Samples : https://developer.chrome.com/extensions/samples

3 - Useful Samples: Samples Directory

4 - Platform Requirements : 

5 - Test Enviroment & Development: 
The Version of the chromium browser needs to be a newer version than 37.0.2062.94 than you are using on your development environment.
The application developers needs to package their applications as a chromium extension. This document explains details of the chromium extensions and it’s also possible to go to chromium’s https://developer.chrome.com/extensions/getstarted web site to get more information relevant to extension development.

6 - Sample Chrome Extension Manifest: 
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



