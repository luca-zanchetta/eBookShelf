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

Finally, in the top-right corner of the page there is a search bar: through this bar, you can search for a book by inserting (part of) its name. If you have selected a category, the book will be searched within the corresponding selected category.

### Personal Library
When you are redirected to the *personal library* page of the application, you can see a list of all the books that you have bought so far. If you have not bought any book yet, you'll simply see a message stating this condition. 

Suppose that you have bought some books. In this case, you see the complete list of all the books you have bought so far, without any category distinction. If you click on a particular book, you'll see the book preview we have discussed in the [book store](#book-store) section, without the button that would allow for a purchase. It is also possible to search for a book that you have bought, by the corresponding search bar placed in the top-right corner of the page.

### Dashboard
The third main component of the application is the *dashboard*, in which you can do many things. First of all, there is a *suggested book* section, in which you can see some books that you haven't bought so far and that the application suggests to you, based on a rating/readers ratio criterion. You are not able to see the classical book preview in this case, but you are still able to perform a quick buy operation; if you want further information about a suggested book, you can always search for it in the [book store](#book-store) section.

Near the *suggested book* section, there is a *balance recap* section, in which you can see the current amount of money that are charged in your personal account. 

## Prerequisites

## Installation and Launch
