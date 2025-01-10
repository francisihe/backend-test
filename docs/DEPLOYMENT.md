# Deployment Documentation
- Documented by Francis Ihejirika

## Overview

This api has been containerized using Docker. The Dockerfile is located in the root directory here: [Dockerfile](../Dockerfile). It has a basic configuration.

I will be deploying to Google Cloud Run and Render for tests, and ultimately select one. I will highlight the steps to deploy to both.



## How To Deploy The App to Render Using Docker

1. Sign in or sign up to Render
2. Select Create New Service at the top right of the page
3. Connect your repository
4. Select Docker as Language
5. Specify the branch and root directory. In this case, the main branch, and the top level directory is the same as the pwd.
6. Specify the Dockerfile path. It is also the root directory
7. Select your instance type and deploy the project

