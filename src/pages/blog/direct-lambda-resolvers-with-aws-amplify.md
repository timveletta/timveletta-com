---
layout: '../../layouts/BlogPost.astro'
title: Direct Lambda resolvers with AWS Amplify
isDraft: false
pubDate: 2020-12-09
description: AWS Amplify is fantastic; it has never been easier to build and
  provision a cloud-based, full-stack, web application. We can easily create an
  API using AppSync and have it just work but what happens when you need to
  perform additional logic?
prevUrl: /blog/2020-12-08-direct-lambda-resolvers-with-aws-amplify/
heroImage: /assets/direct-lambda-resolvers.jpg
tags:
  - aws
  - amplify
  - lambda
  - appsync
---

[AWS Amplify](https://docs.amplify.aws/) is fantastic; it has never been easier to build and provision a cloud-based, full-stack, web application. One of the best features of Amplify is the ability to quickly generate and build a GraphQL API using AWS AppSync and have it seamlessly work with your front-end using generated queries and mutations based off your schema.

By default, when creating an AppSync API through Amplify, Velocity templates are used as resolvers to perform simple CRUD operations on your underlying database. These resolver templates are largely a black box to the developer and don't do much out of the ordinary so when it comes to performing more than just a simple CRUD operation, we need to look elsewhere.

Thankfully, we also have the option to easily provision and manage Lambda resolvers through AWS Amplify to do the job for us. I'm going to show you the easiest way to achieve this.

# Provisioning the Resources

After creating a simple GraphQL API through Amplify, we have a simple `Todo` model in my `schema.graphql` with the following structure.

```typescript
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

If, for instance, we wanted to perform an additional operation whenever we added a `Todo` such as sending an email to a user or interacting with another AWS service; the provided AppSync resolver wouldn't be enough. This is where Lambda resolvers come in and the convenience of Amplify allows us to easily provision them using `amplify add function` as shown below.

```shell
% amplify add function
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

In the above example, we have provisioned a Lambda function and given it access to create data in our DynamoDB table since we want to record data there. From here we can perform an `amplify push` to provision the infrastructure on AWS.

# Making the Schema changes

At this point, the Lambda function is provisioned and available but we can't actually access it through our AppSync API. To do this, we simply create a new mutation and input type within our `schema.graphql` and apply the `@function` directive to the mutation that will call the Lambda function.

```typescript
input AddTodoInput {
  name: String!
  description: String
}

type Mutation {
  addTodo(input: AddTodoInput!): Todo @function(name: "addTodo-${env}")
}
```

I've just included some dummy logic within my Lambda function which just returns an object when it is called however you probably want to insert the record into the DynamoDB table and include some other logic. You can find out how to insert data into DynamoDB using [this page](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property).

```javascript
exports.handler = async (event) => {
	// TODO include any additional logic here
	return {
		id: '1234',
		name: 'Finish blog post',
		description: 'AWS Amplify is great',
	};
};
```

Once again, we have to run `amplify push` to update our changes; then we can go into the AppSync console and run our mutation to see the results below.

![Calling our mutation through the AppSync console.](/assets/screen-shot-2020-12-09-at-1.45.33-pm.png 'Calling our mutation through the AppSync console.')

So that's it, easy enough right!

# The resulting Resolver

Well, its not _technically_ a **direct** Lambda resolver as the title says. If we look at our AppSync schema, we can see that Amplify has actually created a [Pipeline resolver](https://docs.aws.amazon.com/appsync/latest/devguide/pipeline-resolvers.html) for us.

A Pipeline resolver allows us to compose multiple functions into a single call to the GraphQL API. It does so by calling a Velocity template prior to the function or functions, mapping the data from the GraphQL inputs to a Lambda event. Another Velocity template is ran after each of the functions, mapping the data from the last function to the GraphQL response.

![Our resulting pipeline resolver.](/assets/screen-shot-2020-12-09-at-1.47.57-pm.png 'Our resulting pipeline resolver.')

In my opinion, this isn't necessarily a bad thing. You might be sacrificing a miniscule amount of execution speed since calling the resolver now involves running a Velocity template both before and after your Lambda function execution, however, it now allows you to do some great things such as chaining function executions to include additional logic.

For example, if we wanted to include logic to send a message after both adding and removing a `Todo`, we could create the function to send a message once, and reuse it across multiple resolvers.

```typescript
type Mutation {
  addTodo(input: AddTodoInput!): Todo
    @function(name: "addTodo-${env}")
    @function(name: "sendMessage-${env}")
  removeTodo(id: ID!): Todo
    @function(name: "removeTodo-${env}")
    @function(name: "sendMessage-${env}")
}
```

Pushing our changes using `amplify push` and then viewing the AppSync console, we can see the two functions that are chained together to form our pipeline resolver.

![Our pipeline resolver with multiple function calls.](/assets/screen-shot-2020-12-09-at-2.00.19-pm.png 'Our pipeline resolver with multiple function calls.')

AWS Amplify has not only made it super easy to create and provision a new AppSync API, but if the out-of-the-box resolvers aren't doing everything you need, it is just as easy to use a Lambda resolver instead as we saw above.

Header photo by [Bench Accounting](https://unsplash.com/@benchaccounting?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/minimal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
