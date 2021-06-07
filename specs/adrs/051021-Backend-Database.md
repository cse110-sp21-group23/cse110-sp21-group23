# Backend Database Decisions

## Context and Prob*lem Statement

We need to choose a backend service to host and store all of our user data in the bullet journals.

## Considered options 
### GCP Database with Docker container

* Good, because Kent has experience with this set up and could easily get it running. 
* Good Making requests to the server should be very easy
* Bad because there may be a learning curve in installation
* Bad because Kent is the only one familiar with this set up. (Bus factor). 
* Note: Didn't really matter because this was banned. 

### Firebase database

* Good, because it is easy to use. 
* Good because of the plethora of documentation. 
* Good because of the secure authentications and ability to deploy feature flagging. 
* Bad because no one really is an expert in this

### No backend database, use chrome to locally store data

* Bad because it gives us no flexibility and ownership of user data
* Bad because We don't know if it works correctly for users if we don't see how their data is stored
* Bad because no one knows how to do this in Chrome


### Heroku 
* Good because a lot of our backend code that was in GCP could be migrated over. 
* Bad because we were kind of forced into this, so nobody is familiar with it. 

## Decision Outcome 
Chosed option: "Heroku", because  
* We were able to migrate a lot of the existing code we had with GCP over to Heroku fairly easily. 
* We can deploy and manage with Heroku which shrinks our tech stack from the GCP + Docker we had before. 
