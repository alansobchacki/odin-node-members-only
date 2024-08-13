Project: Members Only
=============

A CRUD app where signed users can write posts and stay anonymous from the public.

![members-preview](https://github.com/user-attachments/assets/8fadb4f3-1617-4952-b488-cd7e01ec606b)

Here's the [live project demo.](https://odin-node-members-only.adaptable.app/)

About
-----

This project was completed as part of [The Odin Project](https://www.theodinproject.com/) [NodeJS](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs) curriculum. It is the fourth project required for completion of the NodeJS Course [4/9].

These were the project requirements:

- [x] Set up an Express project and a new PostgreSQL database.
- [x] Set up the models and controllers you’re going to need.
- [x] Set up `bcrypt` to secure the passwords of your users.
- [x] Create a login-form using `passport.js`.
- [x] Add a page where members can “join the club” by entering a secret passcode.
- [x] When a user is logged in give them a link to “Create a new message” (but only show it if they’re logged in!).
- [x] Display all member messages on the home page, but only show the author and date of the messages to other club-members.
- [x] Add an optional field to the user model called Admin and then add the ability to delete messages, but only allow users who have admin == true to see the delete-button and delete messages.
- [x] Deploy your project on your chosen PaaS.
  

What I Learned
-----

I've learned how to use `bcrypt.js` to secure my user's passwords. Also learned the basics of `passport.js` and their 'strategies' (namely `passport-local`).

I also learned how to build different features depending on an user's membership status. For instance, in this app, users are ranked as following:
- Initiate members (can't write messages or see other members, but can attempt to become a member)
- Members (can write messages and see other members, but can't delete any messages)
- Admins (can write messages, see other members, and delete any messages they see fit)

Notes
-----

This app was built using NodeJS, Express, EJS, PostgreSQL, and pure HTML/CSS/Javascript.

The database and the app are hosted at https://adaptable.io/ (big shoutout to the folks behind Adaptable for making such an awesome free plan).

It is NOT mobile-friendly, as I only tend to focus on time-consuming details (like responsive design) when a project demands it.

P.S. — Knowing that signing-up isn't everyone's favorite activity, I've left a 'default user' for whoever wants to check the app. Just check the app log-in instructions!
