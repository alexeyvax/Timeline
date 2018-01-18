# Timeline

Timeline is application that helps Team Leads to keep record of the presence of
people at work and shows who is working with which project.

## Start project

    yarn server

after

    yarn start


## Instruction for use

Firstly you need register a new user and sign in.
Then you need create a new employee and new project.
So to get started, you need to select any project by clicking on it.
After the selected project will be add to current project,
then you can fill any day from employee.
If you want to clear the day you can select cleaning icon by clicking on it.
And then you will can move cursor on any filled day and click on it and day will be clear.
If you want to reset the cleaning mode, you can click the cleaning icon again.


## List of opportunities

This app could:


**auth**

* registration user in database;

* log in registered user;

* log out registered user;


**employee**

* add employee;

* remove employee;

* edit name of employee;


**project**

* add project;

* select color of project, when you create new project;

* remove project;

* edit name of project;


**common**

* switch months;

* set project for user;

* show statistic;


## see api with swagger

    http://localhost:3000/swagger
