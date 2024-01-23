# Getting Started With Node.Js Authentication App
This project is based on Node, Express, MongoDb, Bcrypt, Nodemailer.
This is the node-Authentication app to create a new user, login a user with refresh-token which help to reduce the querying to DataBase, verifying tokens whick are generated at the time of register and login, reset password through sending OTP to the user's mail address, and deleting the user.


## Available Scripts
Firstly you have to run the following command :
  1. `yarn`
  2. `npm install`
These two commands will install all the dependencies which will help to run the Project.

Now you have to make an '.env' file which contains few environment variable like below.....
  `PORT` = 8000  //your app's port number
  `DATABASE` = 'your DataBase Url'
  `SECRETE_KEY` = 'your bcrypt secrete key'
  `REFRESH_KEY` = 'your bcrypt refrence-token key'
  `MAIL_USER` = "your email address"
  `MAIL_PASS` = "your email password"


  And now, you have to run the project by running the command:
  1. `yarn start`
  2. `npm start`
     
     Remember the base-url is `http://localhost:8000/api/v1/`

     
`You can refer the rest.http file for your documentation demo purpose`



# Refrences
<a  href="https://nodejs.org/docs/latest/api/" target="_blank">NodeJS </a>
</br>
<a  href="https://nodejs.org/docs/latest/api/](https://expressjs.com/en/starter/installing.html)https://expressjs.com/en/starter/installing.html" target="_blank">Express </a>


















