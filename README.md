# ivim-takehome
 
## Backend server

In order to run the backend server you must copy down the code, switch directories into express-server, then run npm install, then npm run server. This will start a server on port 8080.

```
cd express-server
npm install
npm run server
```

In order to run tests while in the express-server directory, run:
```
npm run test
```

## Frontend React Application

In order to run the front end react application you must first be running the backend server. Then you can switch directories to react-frontend and run npm install and npm run start

```
cd react-frontend
npm install
npm run start
```

You should see the home page of the react app (at http://localhost:3000) which will allow you to create a new note. After creatinga a new note, you should be able to see the note in the homepage. Clicking on the note's title will reveal a detailed page for the note. From there you can edit/delete the note.

In order to run tests for the front end application while in the react-frontend directory, run:
```
npm run test
```