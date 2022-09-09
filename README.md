# Ste's Game Reviews API

Welcome!

Here I have built my first API for the purpose of accessing application data proframmatically.

This is the backend to my project: Ste's Game Reviews. A project that will look at the reviews of games and allow users to comment/vote on them.

## Connect to the Databases Locally

If you would like to use this project then you will need to fork and clone this repository and run the command, `npm install` to install the releveant packages which include Express and SuperTest.

## Create Enviroment Variables

You will need to create two .env files for your project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these .env files are .gitignored."

Enjoy!
