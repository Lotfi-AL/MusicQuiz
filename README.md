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

After you have installed docker, setup the envs and cloned the project proceed with running this from the root directory: 

`npm run build`

Docker will now spin up four containers, frontend, backend, db, and a seeder. And make the project available on localhost:3000. 

The project only needs to be built once, after you can use `npm start`.

You are now free to check out the site as you wish. If you want to run our tests you can close the docker-daemon with `CTRL+C`. If for some reason the containers continue to run after, use `npm stop`. 


Follow these steps for frontend unit tests: 
1. Go to the root folder of the project
2. Run `npm run test-frontend`

Follow these steps to run backend API tests: 
1. Go to the root folder of the project. 
2. Run `npm run test-backend`



# <center>Project 4, Task B</center>

This time around we decided to go with task B. The reason for this is that we felt our old API wasn't good enough to merit using it in a new React Native application. Therefore, we have completely redesigned our search endpoints, implemented cleaner components to work with the new endpoints in frontend, as well as having written a big suite of tests to properly evaluate the functionality of our project. 

In this README you will only find information about what has changed since the previous iteration, if you would like to see the old documentation, you can do so [here](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-34/prosjekt-3).

## <center>Technology</center>

### Frontend

#### Displaying data

As you can read more about in the backend section, our API endpoints for search had a total rewrite. These new changes quickly made our old components for search obsolete. However, the changes made allowed us to write much more maintainable and modular code for our new components. We added several more filters, and made sorting and limiting the amount of results adjustable through API queries. 

Now we essentially have a three components for our quiz and song display lists. One of these is shared between them, while the other two handle data specific functions such as what filters are available and query string construction. 

### Backend

#### Pagination

Using `mongoose-paginate-v2` we managed to create easily configurable and maintainable code our new search endpoints. We also swapped out the several GET requests we had previosuly with just one, that allowed queries such as `/api/quiz?songsLength[lte]=10&title=RandomQuiz`, and many more. 


### Docker

#### Seeding the database

Previously we used a couple python scripts to seed the database through our API endpoints. This quickly became tedious to manage, as well as made the entire setup process more convoluted than it needed to be. Therefore we decided to make a docker container to do this directly with the database and on every `docker-compose up`. This way the data is consistent between the developers and reduces the total amount of "grunt work" during development. 


#### Testing with docker

The new backend and frontend unit tests are run with a docker-compose file that properly configures the container for testing as well as runs the dependant containers. You may notice that the container is forced to close despite the tests being successful on the backend container. This is an issue with the express server not closing after the tests have been run, and we decided that the workaround with `--abort-on-container-exit` in `docker-compose` was a reasonable compromise. 


### Testing 

#### Backend

The backend is tested with `jest` and `supertest`. Supertest makes it very easy to test API requests on an express server, and felt like a natural choice. All routes used in the frontend are tested, and can be seen in the `__tests__` directory in the backend. 


#### Frontend Unit Tets

The frontend unit tests are done with `jest` and `react-testing-library`. We chose these packages as they were in accordance with the requirements for the project. 


#### E2E Tests

E2E tests are written with `cypress`. Cypress provides great tools for dealing with user actions, as well as a clean interface for running the tests. We have written end to end tests that replicate users behaviour timeline. 