# >>Backend-Express<<

## The backend has been deployed on Heroku:
**Endpoint: https://mmtd-backend-express.herokuapp.com/api**

## Dependencies:
**bcryptjs ^2.4.3**\
**cors ^2.8.5**\
**dotenv ^10.0.0**\
**express ^4.17.1**\
**express-validator ^6.13.0**\
**jsonwebtoken ^8.5.1**\
**mongoose ^6.0.11**\
**nodemon ^2.0.13**\
**request ^2.88.2**

## You must follow the next steps in order to execute the backend:
**1) npm install**
###
**2) npm run dev**\
*(the backend will be run in localhost:4000)*
###
**3) You can test it with this collection: https://www.getpostman.com/collections/257f1248846aab9694f9**
* 3.1 Copy the link.
* 3.2 Open Postman and select Import>Link.
* 3.3 Paste the link in the Import field and click on "Continue".

## How you can send a request to the backend:
*Create a new user or log in with an existing one, then use the token to make all other requests. Send the token in the "x-token" header.*