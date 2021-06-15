---
templateKey: blog-post
title: Building an E-Commerce site with AWS Amplify - Introduction
isDraft: true
date: 2021-06-14T08:36:16.213Z
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

* **Products and Inventory** - the first thing our store needs is some products, I'll go through how to add products, manage their inventory and also search products.
* **Building a Cart** - next, we'll allow users to add products to their cart as well as allowing users to log in and save their cart.
* **Taking Payments** - with [Stripe](https://stripe.com/), this might be less Amplify focused and more Stripe focused but we will see.
* **Administration** - the administrators of the site probably aren't going to be developers so I'll be providing a way to easily add products and view customer orders using the Amplify Admin UI.

I'll be building the front-end with React, using [Tailwind CSS](https://tailwindcss.com/) however I won't be covering much of the development unless its closely linked to the AWS Amplify side of things. All the code will be available via [this repository](https://github.com/timveletta/amplify-ecommerce).

## Setting Up

I've started by scaffolding a new React project using [Create React App](https://create-react-app.dev/docs/getting-started) and [configured Tailwind](https://tailwindcss.com/docs/guides/create-react-app). After [installing Amplify](https://docs.amplify.aws/start/getting-started/installation/q/integration/react#option-2-follow-the-instructions), from the root of the project run:

```bash
amplify init
```

I went through and accepted the default options and then created an AWS Profile to run App on. The CLI will run you through this process if you aren't familiar with it.

```bash
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project amplifyecommerce
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation
```

```bash
yarn add aws-amplify @aws-amplify/ui-react
```

```javascript
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
```

### Adding Hosting

```bash
amplify add hosting
```

```bash
? Select the plugin module to execute Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Continuous deployment (Git-based deployments)
? Continuous deployment is configured in the Amplify Console. Please hit enter once you connect your repository
Amplify hosting urls:
┌──────────────┬────────────────────────────────────────────┐
│ FrontEnd Env │ Domain                                     │
├──────────────┼────────────────────────────────────────────┤
│ main         │ https://main.d2ukpb0d4oeyxt.amplifyapp.com │
└──────────────┴────────────────────────────────────────────┘
```

In the UI connect the branch to automate the deployments