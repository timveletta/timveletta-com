---
templateKey: blog-post
title: "UPDATED: Deploying a static site to AWS using GitHub Actions"
isDraft: true
date: 2020-08-14T08:17:55.538Z
description: A description
featuredimage: /img/aws-github.jpg
tags:
  - aws
  - github actions
  - static site
---
It has been just under a year since I wrote [my initial blog post](https://www.timveletta.com/blog/2020-07-08-deploying-a-static-site-to-aws-using-github-actions/) about deploying static sites to AWS via Github Actions and a number of things have changed since then. Github Actions has been generally available for some time and a number of the referenced packages have changed but the main principles remain the same. In this post I'll explain my process for deploying static sites using Github Action in greater detail and whats changed since the initial version of the article. 

If you're just interested in the build template, it is posted in its entirety at the end of the article. 

## Assumed infrastructure

The template assumes you are using a **private** S3 static site and serving the content using CloudFront. You could just as easily use a **public** S3 static site and omit the `Invalidate Cloudfront CDN` step. 

## **Breaking down the build template**

One of the things I particularly enjoy is breaking down a build into 3 distinct steps, *test, build* and *deploy.* Doing so allows me to easily pinpoint at a glance where things have gone wrong when the build fails. In my previous build, I had combined the build and deploy steps because at that point it was unclear how to share assets between jobs. However this all changed since discovering the `actions/upload-artifact` and `actions/download-artifact` actions.

### The `test` job

The test job is fairly straightforward, it simply checks out the code, installs the dependencies and runs the tests. 

```yaml
 test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Run developer tests
        run: npm test
```

### The `build` job

This is one of the differences from the previous article, I am splitting up the `build` and `deploy` jobs since I now know how to manage build artifacts between steps. In this step, I again check out the code and install dependencies then follow it by building the site. Next, I upload the build artifact to GitHub using the `actions/upload-artifact` action specifying the `build` folder as our source and naming it `frontend-artifact`. This name will be used later on as well as showing in the GitHub interface.

```yaml
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Build frontend
        run: npm run build

      - uses: actions/upload-artifact@v2
        with:
          name: frontend-artifact
          path: build
```

![The frontend artifact showing in the GitHub interface](/img/screen-shot-2020-08-16-at-2.48.05-pm.png "The frontend artifact showing in the GitHub interface")

### The `deploy` job

The deploy job is the other big difference from the previous article since it now uses the `aws-actions/configure-aws-credentials` action to authenticate with AWS and then perform operations.  

```yaml
deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'

    steps:
      - uses: actions/download-artifact@v2
        with:
          name: frontend-artifact

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: <<YOUR REGION HERE>>

      - name: Deploy to S3 Bucket
        run: aws s3 sync ./ s3://<<YOUR S3 BUCKET NAME HERE>>

      - name: Invalidate Cloudfront CDN
        run: aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_DISTRIBUTION_ID --paths '/*'
        env:
          CLOUDFRONT_DISTRIBUTION_ID: <<YOUR CLOUDFRONT DISTRIBUTION ID HERE>>
```

## Putting it all together

talk about when the build runs 

```yaml
name: Frontend CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Run developer tests
        run: npm test

  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Build frontend
        run: npm run build

      - uses: actions/upload-artifact@v2
        with:
          name: frontend-artifact
          path: build

  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/master'

    steps:
      - uses: actions/download-artifact@v2
        with:
          name: frontend-artifact

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: <<YOUR REGION HERE>>

      - name: Deploy to S3 Bucket
        run: aws s3 sync ./ s3://<<YOUR S3 BUCKET NAME HERE>>

      - name: Invalidate Cloudfront CDN
        run: aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_DISTRIBUTION_ID --paths '/*'
        env:
          CLOUDFRONT_DISTRIBUTION_ID: <<YOUR CLOUDFRONT DISTRIBUTION ID HERE>>
```