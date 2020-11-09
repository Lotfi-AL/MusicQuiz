# How to setup the project

This project uses docker-compose, what this does and why we chose to use it can be read further down in the documentation. For now you can download it [here](https://docs.docker.com/desktop/).

First you will have to make a `.env` file in the root-directory. It should contain the following: 
```
MONGO_USERNAME=admin
MONGO_PASSWORD=admin
MONGO_HOSTNAME=db
MONGO_PORT=27017
MONGO_DB=songquiz
```


After you have installed docker, setup the envs and cloned the project proceed with running from the root directory: 

`docker-compose up --build`

Docker will now spin up three containers, frontend, backend, and db. And make the project available on localhost:3000.

In a seperate terminal, navigate to the `/scripts` folder and run: 

`python3 spotiData.py`

The database will now be seeded. This is only necessary to do once. 

You are now free to check out the site as you wish. If you want to run our tests you can close the docker-daemon with `CTRL+C`. 

Unfortunately the process is a bit convoluted. 

Follow these steps: 
1. Go to `/frontend` and alter `tsconfig.json`'s jsx field from `preserved` to `react`.'
2. Run: `docker-compose up backend`.
3. Open a new terminal and navigate to `frontend`. 
4. Run `npm run test`.

This should run all the tests. 

# <center>Project 3, Search</center>

In this project, we have decided to create a website where you can create your own user, search for songs, sort them as you desire and create and save quizzes.
We are using [Material UI](https://material-ui.com/) library to import react components and build our website. Material UI provides well documented and well maintained components and makes it easier to build fast, responsive and clean website.

## <center>Technology</center>

### Frontend

#### Next JS

In this project, we are using React with Typescript and NextJS, which is a React framework enabling fast rendering of pages without the need of rendering unnecessary Javascript (Typescript) and CSS for the desired Page. We chose not to use create-react-app package, just like the last project to be able to have more control of the enviroment and the installed packages, and to get a better understanding of the technology.
Looking back to our project, using NextJs may not have affected our project in the way we desired and the project did not used the benefits the way we wanted.

#### Material UI

As mentioned in the beginning, we are using Material UI as our third party Component library. Material UI proves a well documented, widely used and easy to use components that are fast and updated, which suited our needs for a componant library. Group members also had previous exprience using this library which made the developing faster and easier.

#### Redux

For state management on this project, we chose Redux to store the entire state of the application. This made it easier to access the state of the application such as if a user is signed in through all the components without the need of sending props down to child components or using callback functions to send data back to parent.

#### JWT Javascript Web Token

JWT is used to securely transmitt information between the user (frontend) and backend as JSON objects. this secure method ensures that the data is trusted since it is digitally signed. JWT ensures making, verifying and decoding of the user token in our project, ensuring secure user authentication.

#### Jest & Enzyme

For testing the frontend, we have chosen Jest and Enzyme because of the simplicity of ject and component output test of Enzyme. These together provides a tool that meets our need for testing while making it easy with zero to some configuration.

### Backend

#### MongoDB & Mongoose

This project uses MongoDB and Mongoose on the server side to store and access data. MongoDB is a document-based database management system that uses JSON-style storage (BSON) that makes it easy for application to retrieve and manipulate data.
Mongoose is an ODM that makes the use of MongoDB easier by translating data from the database to objects in the application. Mongoose simplifies the database access and is one of the reason why we chose this.

### Docker

In order to ensure that the development enviroment on each of us is consistent through group members, we decided to use docker. Docker ensures that the working enviroment stays the same across platforms, as well as launching the database. this is done by Docker by running the frontend and the backend in containers that can be seen as small VMs which. Docker is also used to run the tests written both for the backend and the frontend.

## <center> Search, Sort & Filter</center>

Our project implements searching and filtering for songs and the created quizzes. By writing the title of the song, our website will send a requst to the backend to search for the substring written by the user, which then will send a response including all the matching results based on the substring written and filtering the other data, which the gets represented to the user in the data grid.
The user is also able to create quizzes, which are a collection of chosen songs and save to the backend. Here, we have implemented searching and filtering by the length of the quiz, that is to say, the number of songs included in the quiz. This is handled by backend in the same way as described above.

Using [DataGrid](https://material-ui.com/api/data-grid/) enables us to sort the datasets, both songs and quizzes in front end. This sorting enables the user to sort the data by ascenting or decenting based on the content of the columns in the data set (for example alphabetical ASCII sorting on the title, artist, bpm, etc of songs and quizzes).

## <center> Pagination </center>

In order to create an effective rendering and viewing of large datasets, such as songs (600+ elements), without putting the backend on pressure, we have implemented Keyset Pagination. This type of pagination is different from the usual offset pagination where instead of offsetting each time a request is sent, and relying on the database to go through the data from the begging to the offset to find the desired data for the next page, this type of pagination uses filter values from the last page to fetch the next set of items.
Our pagination requires the request sent from frontend to include the timestamp of the last recieved element of the last page, which is then used to directly access the next set of data based on the index of the item. The result is a fast response time on large data sets and less processing time & power on the server.

## <center> Persistent Data</center>

Our project lets the user to create a username and set a password, and be able to log in and out of the website using these. Upon registering, the user gets the oppurtunity to create quizzes, store the quiz and see the other quizzes and the author. The data is stored in the server and is persistent.

## <center>Populating Data</center>

In order to populate enough data (songs & artist) to the server, we initially thought of using the Spotify API to retreive information about an arbitrary number of songs, then processing the information and pushing to the server, but the spotify API came with some limitations which led ut to use retrieved data from another source. The data is pushed by a python script that posts the processed data to the database.

## <center>Testing</center>
