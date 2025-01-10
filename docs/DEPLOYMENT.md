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

## How To Deploy The App to Google Cloud Run

- If you prefer to deploy using the CLI, you can refer to my medium article here: [Medium article](https://medium.com/@francisihe/deploying-an-api-with-puppeteer-on-google-cloud-run-aaca2baf9513?source=your_stories_page-------------------------------------)

- Here, I highlight the deployment process using the console

1. Go to `console.cloud.google.com` to create the project
2. On the left panel, select Cloud Run
3. Click 'Create Service'
4. I will be deploying from the repository, so I will select to `continously deploy from a repository`. If you already have your container image built via the cli, you can use that as well.
5. Select 'Set Up Cloud Build'
6. Select your provider, GitHub in this case
7. Select the repository, click next
8. Select the branch and build type. For build type, select Dockerfile
9. Indicate the location and name of the Dockerfile. In this case, it is the root folder and Dockerfile, save so I will leave it as Dockerfile

10. Configure the service by selecting a service name and region
11. You are given an endpoint url
12. Allow unauthenticated invocations
13. Select your billing preference, your minimum number of instances and your ingress (to either permit only traffic within the VPC or everywhere on the internet)

14. Edit the container and select your preferred port, memory and CPU resources
15. You can add a health check. The health check should be linked to the `healthRoute` which is `/health`
16. Add your environmental variables under 'variables and secrets'. You may need to enable the secrets manager API
17. Add your secrets as shown in the [`env.example`](../env.example) file 
18. If you are using the Cloud SQL Connection, you can reference it here as well.

19. Your initial build may fail due to IAM permissions. You need to grant your service account the Secret Manager Secret Accessor role to access the environment variables if you use the Secret Manager

20. Confirm the API is running using the provided service url