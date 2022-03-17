<h1 align="center">A Full Stack Auction Website</h1>

![Tech logos](https://i.ibb.co/f4Qc3Fj/tech-info-auction-website.png)

## 📝 Table of contents

- [Features](#-features)

- [Technologies](#-technologies)
- [About this Project](#-about-this-project)
- [Local Development](#-local-development)
- [License](#-license)

## ✨ Features

- User is able to create a ticket
- User can make purchases on a ticket
- Ticket reserved are locked and user has only 15 minutes to pay for ticket
- Ticket reserved cannot be purchased by other users
- Server-Side Rendering using React and Next.js
- Automated testing suites for each microservice
- Handles payments using the Stripe API
- Shares common code among services using a custom [npm package]



### Overview of services

| Service                             | Technologies               | Description             |
| ----------------------------------- | -------------------------- | ----------------------- |
| [Auth](./services/auth)         | TypeScript, MySQL          | Handles user regristration, logging in, signing out and resetting users passwords  |
| [Bids](./services/bid)          | TypeScript, MySQL          | Handles users placing bids on auction listings and allows for real-time bidding using Socket.io |
| [Email](./services/email)       | TypeScript                 | Allows other services to send emails to users by publishing EmailCreated events |
| [Expiration](./services/bid)    | TypeScript, Redis          | Expires auction listings once they have ran out of time remaining on the listing |
| [Frontend](./services/frontend) | TypeScript, React, Next.js | Handles serving the website to the user utilizing Server Side Rendering using React with Next.js |
| [Listings](./services/listings) | TypeScript, MySQL          | Allows users to create and delete auction listings |
| [Payments](./services/payments) | TypeScript, MySQL          | Allows users to pay for auction listings they have won   |
| [Profile](./services/profile)   | TypeScript, MySQL          | Allows users to get a users profile or update their own |


## 💻 Technologies

### Back-end
- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MySQL](https://www.mysql.com/) -  An open-source relational database management system
- [Redis](https://redis.io/) -Redis is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability.

- [Docker](https://www.docker.com/) - A platform for developing, shipping and running applications
- [Kubernetes](https://kubernetes.io/) -  An open-source system for automating deployment, scaling, and management of containerized applications
- [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/) - NGINX Ingress Controller for Kubernetes
- [Skaffold](https://skaffold.dev/) - Handles the workflow for building, pushing and deploying applications
- [Stripe](https://stripe.com/) - Online payment processing for internet businesses
- [Jest](https://jestjs.io/) - A JavaScript testing framework

### Front-end
- [ReactJS](https://reactjs.org/) - Frontend framework
- [Next.js](https://nextjs.org/) - React framework that enables server-side rendering


## 📙 About this Project

This is my first project on microservices. I followed[Stephen Griders course on Microservices](https://www.udemy.com/course/microservices-with-node-js-and-react/).
However I am yet to add more functionalities of my own to it and I cannot wait to create more microservice project.








