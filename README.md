# Agenda APP

A simple app using node & express for managing phone books

## Live preview

Open [agenda.html](https://crsnrazvan84.github.io/node-agenda-app/public/agenda.html)

## Content
- **CRUD** operations:
    - **C**reate new contact
    - **R**ead contacts from [contacts.json](public/data/contacts.json)
    file
    - **U**pdate contacts
    - **D**elete contact
- Search contact

## Main links

 - [Express Nodejs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)
 - [Read & Write json files](http://stackabuse.com/reading-and-writing-json-files-with-node-js/)

## Steps to configure (1st time)

```
npm install express-generator -g
express --view=hbs node-agenda-app
cd node-agenda-app
npm install --save-dev nodemon
npm install cors --save
npm install
```

### Enable nodemon
Edit **package.json** and add next lines:
```
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
}
```

## Setup node.modules (on a new PC)

```
git clone https://github.com/Crsnrazvan84/node-agenda-app.git
cd node-agenda-app
npm install
```

## Running the app

```
npm run devstart
```

open http://localhost:3000/agenda.html