cd mongodb/
mongod -dbpath data

npm start

? slc arc ?

##Initial DB Setup
node src/server/config/db.setup.js

##Test
###Server - Rest Api Tests
npm run test
###Client - E2E Tests
npm run update-webdriver
npm run preprotractor
npm run protractor

##RAML
###raml2html raml/api.raml > capstone.html


## Host Application
npm start


##Deploy Bluemix
cd <directory>
###connect to bluemix
bluemix api https://api.eu-gb.bluemix.net

###Log in to Bluemix.
bluemix login -u juan.jordaan1234@gmail.com -o juan.jordaan1234@gmail.com -s dev

###Deploy your app
cf push capstone-juan-jordaan

###access app
http://capstone-juan-jordaan.mybluemix.net

### Passport with Facebook
https://developers.facebook.com/docs/javascript
https://www.coursera.org/learn/web-development-project/discussions/all/threads/2RNP2RytEeaPqRI66g-Cyw


### CORS
http://blog.ionic.io/handling-cors-issues-in-ionic/
https://www.coursera.org/learn/web-development-project/discussions/all/threads/3VlWiAuZEea44Qp49aJR6w
http://stackoverflow.com/q/23823010/1288109
