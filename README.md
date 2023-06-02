![GA Logo](https://raw.githubusercontent.com/karinas98/MusicLibraryProject/main/469f976e-1432-11e5-8199-6ac91363302b.png) 

# Artist & Design E-Commerce - Shop & Buy

##Deployment Link
https://shop-and-buy.netlify.app

##Timeline
3 Weeks - Solo Project

## Project Brief
Build a full stack application by making my own backend and front-end
Use Python Django API & using Django REST Framework to serve the data from Postgres database
Consume my API with a separate front-end, built with React
Implement thoughtful user wireframes
Complete & Launch a final & functioning product

## Project Overview
For this project, I wanted to find an idea that I can build on and easily increase its complexity. I’ve always had some interest towards how to build an e-commerce site and this project is a starting point for that. My idea around the theme was to give a voice and space to upcoming artists and designers to show their work and potentially sell a few pieces to those that value quality handmade products. This is why the application is an exclusive site that you need to register and create a profile for. Once that is done, you are able to create a new ad, write product reviews, see your favourite’s list and add items to the cart. You also have a personal profile where all your created products can be found and where you can delete and update your listing.

## Planning & Wireframing
What I wanted to achieve with this wireframe is to create a full prototype to understand the user experience and all functionalities. By doing so, I could then take it page by page and really grasp what needs to happen. 

![](https://github.com/karinas98/project4_frontend/blob/9ac4d69b9d5ea96c90e4ae55a6f4a01d7bd9cc75/Screenshot%202023-06-02%20at%2011.06.38.png)

## Road Map

### Backend
The first part of this project was to build a Python API backend. I first planned out the apps and models for each that I would be needing for this project. That entailed an app for products, categories, reviews, favourites, cart and JWT authentication.  For each of these apps created, I then tested out with Django and Postman if my data could be accessed and created. 

### Front-end

Once the Backend was ready, I then started planning out my front-end. My first step was establishing all the necessary routes and navbar needed throughout my application and making sure that they all work. 

Once that was done, I got started on adding the navbar to all the routes. 
Since this is an exclusive site and you need to be registered or logged in to access the content. I made it so that all navigation icons navigate to the registration page if a token is not found and if so, a logout and feed is added. 

