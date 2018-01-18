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



## api

* '/api/auth-user' - get login page

  body:

    - login {string},
    - passwd {string}

* '/api/registration-new-user' - registration new user

  body:

    - login {string},
    - passwd {string}

* '/api/init-load-data' - log in user

  query:

    - login {string}

* '/api/add-new-employee' - create new employee

  body:

    - login {string},
    - name {string}

* '/api/add-new-project' - create new project

  body:

    - login {string},
    - name {string},
    - color {string}

* '/api/add-new-fill-day' - fill the day with the project for employee

  body:

    - login {string},
    - id {string},
    - status {string},
    - color {string},
    - dayOfWeek {string}
    - year {number},
    - month {object}:
      - name {string},
      - number {number},
    - number {number},
    - hours {number},

* '/api/remove-fill-day/:id' - clear day for employee

  params:

    - id {string}

  query:

    - login {string},
    - employee {string}

* '/api/save-name-employee/:id' - save changed name of employee

  params:

    - id {string}

  body:

    - id {string},
    - login {string},
    - name {string},
    - type {string}

* '/api/save-name-project/:id' - save changed name of project

  params:

    - id {string}

  body:

     id {string},
    - login {string},
    - name {string},
    - type {string}

* '/api/remove-employee/:id' - remove employee

  params:

    - id {string}

  query:

    - login {string}

* '/api/remove-project/:id' - remove project

  params:

    - id {string}

  query:

    - login {string}
