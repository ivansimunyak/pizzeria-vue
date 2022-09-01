# Pizzeria

## Short Description

This project is a multi location pizzeria, with stores across multiple cities and multiple locations at a city. Project contains 4 different interfaces for user, and those are: admin interface, employee interface, customer interface and guest interface. Admin interface allows the user to add, update or delete almost everything you can see. Admin can add more stores, more payment methods, change user type of any user in database, read and update orders and their status and so much more. Employee interface contains all of the features regular logged in customer has, with addition of being able to see all of the orders, edit them, change their status or even delete them. Third interface is customer interface, which gives user ability to store their personal information like adress, phone number or email for a quicker ordering experience. Customers also have an ability to send message to the admin about any difficulties or problems they might have with their order. Big feature of customer interface is access to their profile where they can view all their data, and their orders. There they can change their personal information or change their password. And finally we have guest interface, which is default interface that user will see when they first visit the app. It allows only basic functions apart from login, and register. Users can also make an order without logging in, but unlike logged in users, they have to manually fill out all the required fields. Those are the main features of this project, this was my first encounter with all of the technologies i used in this project. So please forgive me for any discrepancies in code you might encounter. I am constantly looking for ways to improve this project, so if you have any suggestions feel free to contact me.  

## Technologies
 Project is built with:
 * Vue.js
 * Node.js/Express.js
 * MySQL

## Project setup

Set up database from pizzeriadb.sql and run commands below to start.
For the backend to work set up your credentials at:
* server/db/index.js
* server/routes/ordersRouter.js
* server/routes/userRouter.js

At login you can use any of the following three combinations to see different interfaces:
1. username: admin password: admin
2. username: employee password: employee
3. username: customer password: customer



```
## Install project

npm install

## Frontend

npm run serve

## Backend

npm run dev
```

