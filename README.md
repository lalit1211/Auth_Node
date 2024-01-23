# Getting Started With Node.Js Authentication App
This project is based on Node, Express, MongoDB, Bcrypt, and Nodemailer.
This is the node-Authentication app to create a new user, log-in a user with refresh-token which helps to reduce the querying to DataBase, verify tokens which are generated at the time of register and login, reset password through sending OTP to the user's mail address and deleting the user.


## Available Scripts
Firstly you have to run the following command :
  1. `yarn`
  2. `npm install`
These two commands will install all the dependencies which will help to run the Project.

Now you have to make an '.env' file which contains a few environment variables like below.....
  `PORT` = 8000  //your app's port number
  `DATABASE` = 'your DataBase Url'
  `SECRETE_KEY` = 'your bcrypt secrete key'
  `REFRESH_KEY` = 'your bcrypt reference-token key'
  `MAIL_USER` = "your email address"
  `MAIL_PASS` = "your email password"


  And now, you have to run the project by running the command:
  1. `yarn start`
  2. `npm start`
     
     Remember the base URL is `http://localhost:8000/api/v1/`

     
`You can refer to the rest.HTTP file for your documentation demo purpose`



# Refrences
<a  href="https://nodejs.org/docs/latest/api/" target="_blank">NodeJS </a>
</br>
<a  href="https://expressjs.com/en/starter/hello-world.html" target="_blank">Express </a>
</br>
<a  href="https://www.mongodb.com/docs/" target="_blank">MongoDB </a>
</br>
<a  href="https://www.npmjs.com/package/bcrypt" target="_blank">Bcrypt </a>
</br>
<a  href="https://nodemailer.com/" target="_blank">NodeMailer </a>
