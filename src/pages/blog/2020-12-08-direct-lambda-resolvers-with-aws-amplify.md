---
templateKey: blog-post
title: Direct Lambda resolvers with AWS Amplify
isDraft: true
date: 2020-12-08T08:02:40.087Z
description: something
featuredimage: /img/screen-shot-2020-12-09-at-2.00.19-pm.png
tags:
  - aws
  - amplify
  - lambda
  - appsync
---
AWS Amplify is fantastic, it has never been easier to build and provision a cloud-based, full stack, web application. When building an API with AppSync through Amplify, the default is to use Velocity templates to perform CRUD operations on your database models. These resolver templates are largely a black box to the developer and don't do much out of the ordinary so when it comes to performing more than just a simple CRUD operation, we need to look elsewhere.

Thankfully we have the option to easily provision and manage direct Lambda resolvers through AWS Amplify to do the job for us.

# The Example

After creating a simple GraphQL API through Amplify, I have a simple \`Todo\` model with the following structure.

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

If, for instance, we wanted to perform an additional operation whenever we added a \`Todo\` such as sending an email to a user or ...

```shell
tim@tims-mbp direct-resolver-example % amplify add function
? Select which capability you want to add: Lambda function (serverless function)
? Provide a friendly name for your resource to be used as a label for this category in the project: addTodo
? Provide the AWS Lambda function name: addTodo
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources in this project from your Lambda function? Yes
? Select the category storage
Storage category has a resource called Todo:@model(appsync)
? Select the operations you want to permit for Todo:@model(appsync) create

You can access the following resource attributes as environment variables from your Lambda function
	API_DIRECTRESOLVER_GRAPHQLAPIIDOUTPUT
	API_DIRECTRESOLVER_TODOTABLE_ARN
	API_DIRECTRESOLVER_TODOTABLE_NAME
	ENV
	REGION
? Do you want to invoke this function on a recurring schedule? No
? Do you want to configure Lambda layers for this function? No
? Do you want to edit the local lambda function now? No
Successfully added resource addTodo locally.
```

Then perform an amplify push

Create the mutation and input type

```
input AddTodoInput {
  name: String!
  description: String
}

type Mutation {
  addTodo(input: AddTodoInput!): Todo @function(name: "addTodo-${env}")
}
```

Simple dummy function

```
exports.handler = async (event) => {
  // TODO include any additional logic here
  return {
    id: "1234",
    name: "Finish blog post",
    description: "AWS Amplify is great",
  };
};
```

Go into the AppSync console to perform the query.

![](/img/screen-shot-2020-12-09-at-1.45.33-pm.png)

Not technically a direct lambda resolver but instead a pipeline resolver

![](/img/screen-shot-2020-12-09-at-1.47.57-pm.png)

This allows us to do some interesting shit, if we want to a send message 

```
type Mutation {
  addTodo(input: AddTodoInput!): Todo
    @function(name: "addTodo-${env}")
    @function(name: "sendMessage-${env}")
}
```

We can chain the functions

![](/img/screen-shot-2020-12-09-at-2.00.19-pm.png)