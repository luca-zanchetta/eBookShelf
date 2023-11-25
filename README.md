# eBookShelf
**Presented by:**
- Mattia Aquilina, 1921153
- Luca Zanchetta, 1848878

## Index
- [Introduction](#introduction)
- [The application](#the-application)
  - [Book Store](#book-store)
  - [Personal Library](#personal-library)
  - [Dashboard](#dashboard)
- [Prerequisites](#prerequisites)
- [Installation and Launch](#installation-and-launch)

## Introduction

Welcome to **eBookShelf**! This is a web application implementing a simple ebook marketplace. Here, you'll find a huge variety of books that you can purchase and read wherever you want: you just need an account and an internet connection!

The architecture of the application is composed of:
- A **frontend** node, that is based on a **NodeJS** development server and on the **ReactJS** framework;
- A **backend** node, that is a **RESTful Web Service** developed in python, through the **Flask** framework;
- A **database** node, that is a simple **MongoDB** DBMS.

All the system is able to run on-premise: see the [Installation and Launch](#installation-and-launch) section for further details. The whole application is based on the **7k Books** dataset (cfr. [https://www.kaggle.com/datasets/dylanjcastillo/7k-books-with-metadata]), which is a dataset providing around seven thousand books containing information about identifiers, title, subtitle, authors, categories, thumbnail url, description, published year, average rating, and number of ratings of the books themselves. The dataset is provided as comma-delimited CSV file.

## The application
**eBookShelf** is a web application implementing a simple ebook marketplace. Once you have launched the application (see the [Installation and Launch](#installation-and-launch) section), you'll be redirected to the login page. First of all, you'll have to create an account, in order to have access to all the features of eBookShelf: you can do this by clicking on the *Sign Up* link that you'll find into the login form. Once you have created an account, you'll be redirected again to the login page: now it's time to perform the login.

Once the login has been performed, you'll be redirected to the homepage of the application: the [book store](#book-store). On the left side, you can see a sidebar: you should see your name and surname, your username, you balance and a navigation menu. At the end of the sidebar, you should see a *delete account* button, together with a *logout* button; you should be careful in clicking the first one, as it may delete all of your data. All the available interfaces and features will be described in the subsections below.

### Book Store
Right after the login, you have been redirected to the homepage of the application: the *book store*. Here, you can find some books that are currently popular and some categories on the bottom part of the page. By clicking on a book, a book preview will appear on the right side of the page, showing some relevant information about the selected book: the title, the author(s), the number of pages, the description, and so on. There is also a button in the bottom part of this preview, allowing you to buy the selected book: of course, you can buy a book if and only if you have enough credit and you have not yet bought that particular book. If you decide to buy the selected book and the transaction is successful, you'll be redirected to the [personal library](#personal-library) page: further details are given in the corresponding section. 

In the bottom part of the page, there are some book categories that you can exploit. There is also a *view all* button, that when clicked will make the application show all the book categories that are in the system. In any case, when you select a category, the application will show a list of all the books belonging to that particular category. If you select a book, the application will show the book preview we have discussed above. 

### Personal Library

### Dashboard

## Prerequisites

## Installation and Launch
