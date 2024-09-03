# Winterfell Challenge

## Learnings
    webhooks, unit tests in node, starkbank sdk
- **webhook:** This was my first time actually using webhook, I knew it on theory but hadn't used in a real project until now;
- **node:test:** I've barelly made unit tests on node projects, and when I did it was with JEST, but for this project I prefered to use a build-in option that is stable and reliable since node v20.x
- **starkbank-sdk:** was new to me, and I had joy reading the documentation both on docs site or github repo;
- **EC2:** Even though I had already used AWS, it was my first time using a EC2 or alike to upload my project, I have decided for this option for the simplicity sake.

---

## Unit tests
    Tests created for each functionality required 
- **node:test** over JEST: Instead of using JEST, I decided that would be a nice oportunity to use the new node:test the build-in tool for tests in node that brings performance, less dependencies and no transpiling process;
- **supertest** and **sinon** were used to request a get method to the server and mock data to pass the starkbank event parser;
- *npm run test* is the defined script to run the tests.

---

## Readability and efficiency
    Code standarts + Best practicies 
Regarding readability I tried to follow the stardards of the official documentation, plus avoiding nested brackets and parenthesis, and for better performance used *const* over *let*, wrote concise functions and respected the one responsability principle. Also used the modern ESM modules that is more widelly accepted for cross platform (e.g. Node and Browsers). Yet regarding the readability the variables, functions and files all have meaninfull names, avoiding achronimns and shortened names. 

---

## Delivery
    ASAP
This challenge was done and submited **as soon as possible** and I expect that it shows how eager I am to solve this and other problems related, doing fast changes and deliveries without losing quality, organization and good comunication

---

## Cloud
    EC2 over Lambda
Regarding the KISS principle, for the scope of this project I thought it would be better to use a simple EC2 to run this as an Express API. But as it would get bigger I understand that a more robust and fast solution would be needed. 

---

## Stark Bank
    Time is money. Use both wisely.
Stark Bank is a fintech listed on YC as one of world top startup focused on providing digital banking and automated financial services for businesses. It offers API-driven solutions for payments, collections, and account management, business operations and finances efficiently. Stark Bank is also one of the fastest and more secure solutions on financial and tech fields.

---

## SDKs and Libraries
	Starkbank offers 9 SDKs to integrate w/ their API
As strongly advised on the documentation, I used the SDK provided to get to the solution, even using it to get the keys of the project and webhook.

---

## Tools
    Minimalism
The tools I used to help me was VSCode for coding, webhook.site to test, node:test for unit tests, eslint for linting, nodemon for developing and AWS for the cloud solution
