Build instructions
------------------

`npm install -g cordova`    
`cd cookiejar`    
`cordova platforms add android`    

Copy lib folder from [Paypal Android SDK](https://github.com/paypal/PayPal-Android-SDK) to cookiejar/platforms/lib    

`cordova run --target=xxxxxx`    

To check for the device target number run:
`adb devices`

