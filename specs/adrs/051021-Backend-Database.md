# Backend Database Decisions

## Context and Problem Statement

We need to choose a backend service to host and store all of our user data in the bullet journals.

### Node.js with a SQL Backend Database

* Good, because Kent can easily set it up with his experience with this
* Good Making requests to the server should be very easy
* Bad because there may be a learning curve in installation

### Firebase database

* Good, because it is easy to use
* Bad because no one really is an expert in this

### No backend database, use chrome to locally store data

* Bad because it gives us no flexibility and ownership of user data
* Bad because We don't know if it works correctly for users if we don't see how their data is stored
* Bad because no one knows how to do this in Chrome
