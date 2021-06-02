---
templateKey: blog-post
title: Building an E-Commerce site with AWS Amplify - Introduction
isDraft: true
date: 2021-05-30T14:29:38.454Z
description: " "
featuredimage: /img/home-jumbotron.jpg
tags:
  - amplify
  - aws
  - e-commerce
---
I've built a number of different web applications over the years usually for enterprises so most of them don't see use outside of the businesses I've built them for. One such application I've never built, despite the prevalence of online shopping, is an e-commerce site and for good reason. With SaaS products like Shopify and Salesforce, it doesn't make a lot of sense to build one from scratch however I've always thought it would be interesting to try.

I've also been wanting to learn more about AWS Amplify after trying it a while ago. At the time I felt like it wasn't quite ready however it has matured to the point where I think it is one of the best ways to get started with cloud native development. I feel like it abstracts away enough of the tedious work while also providing a way to get "under the hood" if needed.

I'm going to break down the project in several parts:

1. **Products and Inventory** - the first thing our store needs is some products, I'll go through how to add products, manage their inventory and also search products.
2. **Building a Cart** - next, we'll allow users to add products to their cart as well as allowing users to log in and save their cart.
3. **Taking Payments** - with [Stripe](https://stripe.com/), this might be less Amplify focused and more Stripe focused but we will see.
4. **Administration** - the administrators of the site probably aren't going to be developers so I'll be providing a way to easily add products and view customer orders using the Amplify Admin UI.

I'll be building the front-end with React, using [Tailwind CSS](https://tailwindcss.com/) however I won't be covering much of the development unless its closely linked to the AWS Amplify side of things. All the code will be available via [this repository](https://github.com/timveletta/amplify-ecommerce).

## Setting Up

I've started by scaffolding a new React project using [Create React App](https://create-react-app.dev/docs/getting-started) and [configured Tailwind](https://tailwindcss.com/docs/guides/create-react-app).