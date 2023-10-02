---
title: Pushing Content to AWS S3 from Github Actions
pubDate: 2023-02-27
description: Something I constantly get asked about is how to easily sync data between Github Actions and AWS S3 so lets explore how to create a bucket and sync some content to it from your Actions.
heroImage: /assets/s3-github-actions.jpg
imageCreditName: Obi - @pixel7propix
imageCreditLink: https://unsplash.com/@obionyeador?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags:
  - aws
  - github
---

Amazon Web Services (AWS) Simple Storage Service (S3) is a highly scalable object storage service designed to store and retrieve any amount of data from anywhere on the web. Github Actions is a powerful tool used to automate workflows, including building, testing, and deploying code. In this blog post, we will explore how to push content to an S3 bucket from Github Actions.

## Setting up AWS S3 Bucket

Before pushing content to an S3 bucket, you must have an S3 bucket created in your AWS account. To create a new bucket, you can navigate to the AWS S3 console, click on the 'Create Bucket' button, and follow the prompts to create a new bucket. Once the bucket is created, you need to take note of the bucket name and the AWS region where the bucket was created.

## Configuring Github Actions Workflow

With the S3 bucket set up, we can now create a Github Actions workflow to push content to the S3 bucket. First, we need to create an access key that will allow Github Actions to access the S3 bucket. To create an access key, navigate to the AWS IAM console, click on the 'Users' tab, and create a new user. Once the user is created, you can attach an S3 policy to the user to allow access to the S3 bucket. After attaching the policy, you can generate an access key and secret access key for the user.

After creating the access key, navigate to your Github repository, click on the 'Actions' tab, and create a new workflow. In the workflow file, you can add the AWS CLI commands to push content to the S3 bucket. These commands will use the AWS access key and secret access key to authenticate the upload process.

Here is an example workflow file that pushes the contents of the 'build' directory to an S3 bucket:

```yaml
name: Push to S3

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup AWS CLI
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Sync files to S3 bucket
        run: |
          aws s3 sync build s3://my-bucket-name --delete
```

Note that the access key and secret access key are stored as Github repository secrets, and are accessed using `${{ secrets.AWS_ACCESS_KEY_ID }}` and `${{ secrets.AWS_SECRET_ACCESS_KEY }}`. Also the `--delete` flag means that any files that exist in S3 but not our `build` directory are deleted when the sync happens.

With the workflow committed and pushed to your Github repository, the workflow should automatically run, and content should be pushed to the S3 bucket. You can monitor the progress of the workflow in the Github Actions tab. If the workflow completes successfully, you should be able to see the pushed content in the S3 bucket.

Github Actions provides an easy and powerful way to automate the process of pushing content to an S3 bucket. By following the steps outlined in this blog post, you can set up a Github Actions workflow to push content to an S3 bucket in no time.
