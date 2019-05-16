# Introduction

We are the Full-Stack Pancakes! Our group includes @ejparnell,
@binnsy, @jafarlow, and @JeanAugustin. We made an app where a user
is able to create custom surveys in the format of 'Would You Rather?'.

### How it's done

The back end uses a NOSQL database to store our documents. There are four documents; users, one, two, and surveys. The user document hold all of our user information. The one document holds the information for answer one, and the two document holds the information for answer two. A survery has an answer one and an answer two.

### Technologies Used
* Express.js
* JavaScirpt
* Node.js
* MongoDB
* Mongoose

### The Future and Unsolved Bugs

In later additions we would like to make the dashboard real time so
you would be able to see surveys come in as they are made. Some bugs we would like to fixed are having the voting logic on the back end that way it's more secure.

### Planning and Problem Solving

Our first day of the project we had created 3 schemas. Survey, questions, and answers. Survey could have many questions, and questions could have many answers. On the second day we had taken a shift in the project and wanted to do a 'Would You Rather?' themed survey. From here all the pathes had to be recoded. So a survey has an answer one and an answer two. In the answer schema we needed to track the number of times a person had voted on it so we had added a count field to the document.

### ERD

 You can vist the ERD at https://i.imgur.com/RzWnLOg.jpg

### API End Points

| Verb | URL | Route |
|------|-----|-------|
| POST | /sign-up | users/create |
| POST | /sign-in | users/create |
| DELETE | /sign-out | users/destroy |
| PATCH | /change-password | users/update |
| POST | /surveys | surveys/create |
| PATCH | /surveys/:id | surveys/:id/update |
| DELETE | /surveys/:id | surveys/:id/destroy |
| GET | /surveys | surveys/index |
| GET | /surveys/:id  | surveys/show |
| PATCH | /ones/:id | ones/:id/update |
| DELETE | oneys/:id | ones/:id/destroy |
| GET | /ones | ones/index |
| GET | /ones/:id  | ones/show |
| POST | /ones | ones/create |
| PATCH | /twos/:id | twos/:id/update |
| DELETE | twos/:id | twos/:id/destroy |
| GET | /twos | twos/index |
| GET | /twos/:id  | twos/show |
| POST | /twos | twos/create |

### Links to Deployed site and Front End

You can vist the deployed site here: https://salty-caverns-24367.herokuapp.com/
You can vist the front end here: https://the-full-stack-pancakes.github.io/survey-front-end/ 
