# First Impressions / Judge me

## Overview

We all know the saying "don't judge a book by it's cover." First impressions are typically wrong and based on stereotypical profiling. But what if... someone explicitly requested you to judge them by an image?

First Impressions is a web-based game that presents users with a photo of a stranger and a quiz about them with general attributes like name, city, job title, and more contentious attributes like race, sexual orientation, dietary restrictions, etc. How much can we truly uncover from an image of a person? How much falls through the cracks? First Impressions is fun for both those guessing about others as well as for those who upload a photo - what do people judge about your cover?


## Data Model

(___TODO__: a description of your application's data and their relationships to each other_)

The application will store UserProfiles (user-uploaded), Lists and Items

* users can have multiple lists (via references)
* each list can have multiple items (by embedding)

(___TODO__: sample documents_)

An Example User:

```javascript
{
  username: "shannonshopper",
  hash: // a password hash,
  lists: // an array of references to List documents
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Breakfast foods",
  items: [
    { name: "pancakes", quantity: "9876", checked: false},
    { name: "ramen", quantity: "2", checked: true},
  ],
  createdAt: // timestamp
}
```

## [Link to Commented First Draft Schema](db.js)

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## [Site map](https://www.gloomaps.com/6H69np2mjP)

## User Stories or Use Cases

###### (non-registered)
1. as a user, I can upload a profile with the site
2. as a user, I can pick one answer for each question (quiz/poll style)
3. as a user, I can see what others guessed
4. as a user, I can see the right answers
5. as a user, I can share this with my friends (social media)

###### (registered)
1. as a user, I can log in to the site
2. as a user, I can remove bad profiles / answers

## Research Topics

* (4 points) Integrate [Google user sign in](https://developers.google.com/identity/sign-in/web/sign-in)
    * I'm going to be using Google for user authentication
    * I want login to be as frictionless as possible to encourage more users to create profiles 
* (5 points) Implement quiz functionality / html
    * see <code>https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript</code>
    * I've never had to build something that has multiple answers with right/wrong statuses. should be a bit challenging!
* (4 points) React.js
    * use react.js as the frontend framework

## [Link to Initial Main Project File](https://github.com/nyu-csci-ua-0480-008-spring-2020/devinlewtan-final-project/blob/d7a93d52d3a7f440ab183288925033ad5d89984d/app.js#L1)

## Annotations / References Used

1. [Google user sign in](https://developers.google.com/identity/sign-in/web/sign-in) - (add link to source code that was based on this)
2. [tutorial on redering quiz html](https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript) - (add link to source code that was based on this)
