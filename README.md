# Blog API

This repository is part of a Blog App project completed for partial fulfillment of the curriculum of The Odin Project. The project is made up of a backend API and two frontend SPAs. See the links below for the other repositories:

- Click [here](https://github.com/meuzishun/blog-client) for the Client repository and [here](https://meuzishun.github.io/blog-client/) for the live site
- Click [here](https://github.com/meuzishun/blog-client-author) for the Client-Author repository and [here](https://meuzishun.github.io/blog-client-author/) for the live site

## Overview

## Journal

I began the process by creating the models for the data needed: user, post, comment. I make a list for each model, outlining what data was needed for each.

User:

- firstname
- lastname
- email (used for log in)
- hashed password
- isAdmin (Boolean)

Post:

- author
- title
- content
- timestamp
- isPublished (Boolean)

Comment:

- author
- post
- content
- timestamp

Since I am using MongoDB, I installed mongoose and imported it to each file to create schemas and later exporting the models. Most of the data for each schema was required. Several data types were string, but some are references to other data types (e.g. a post author is referencing a user's id). I referenced models from previous projects so I copied over a virtual for each model that just returns the url with the database id... not sure if they'll be needed. Then I setup the database on MongoDB. Not too much going on here yet, just grabbed the connection url and stored it in a .env file (make sure to add the .env to the .gitignore file!).

Next I created the express app. I wanted to make sure to only import necessary packages to the main app file to keep it as simple as possible. Install and import express, create the app, listen on port 3000 and log to make sure it is working. I put a port value in the .env file and installed and imported the dotenv package to use environment variables in the app file.

After that, I started working on the routes. At first I wanted to house all the routes in an index file as I had seen done elsewhere, but I decided that they should be nested, comments inside of posts. To do this and still have access to the outer req.params, there is an additional setting for the express.Router():

```
const router = require('express').Router({ mergeParams: true });
```

I used the app Postman to test these routes. Postman lets you store your test routes in a collection for reuse. It is a good idea to name and save the post tabs in Postman to a collection for future reuse.

I then extracted the post and comment controllers and put them in separate files from the routes. Generally considered good practice and I also find it very helpful to conceptualize everything this way. As of this point, the controllers were just sending basic JSON to confirm that they were hooked up properly.

Up next was the database. I just setup a MongoDB and got the connection URL which I stored in the .env file. I did create a special file, "database.js", for creating the database connection with mongoose and put it in a new directory, "config". Again, separation of concerns. This "config" directory was helpful later on with authentication and authorization.

When working on registering and logging in users, I decided to extract these controllers as well, "authorizationController.js".

- lib directory holds validators, issueJWT, generation of key pairs
- authentication and authorization, PassportJS, extracting isAuth and isAdmin
- thing about Passport passing on user after auth
- post and comment controllers, try/catch, checks that don't work
