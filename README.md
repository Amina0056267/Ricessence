# Ricessence

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Remember 

asalah@ALT-0184 MINGW64 ~/Repository/Ricessence/backend (3-create-a-pages-module)
$ /c/Users/asalah/sqlite-tools/sqlite3.exe data.sqlite
SQLite version 3.49.2 2025-05-07 10:39:52
Enter ".help" for usage hints.

(this will spin up sqlite prompt)

sqlite> DELETE FROM products;
sqlite> .quit

asalah@ALT-0184 MINGW64 ~/Repository/Ricessence/backend (3-create-a-pages-module)
$ /c/Users/asalah/sqlite-tools/sqlite3.exe data.sqlite < seed.sql

asalah@ALT-0184 MINGW64 ~/Repository/Ricessence/backend (3-create-a-pages-module)
$




To start the app fully:

node index.js - to spin up backend  (need to be in git bash)
Ng serve - to spin up front end 

Next steps:
Types file 
Strongly type 
Ngrx instead of using services 


Heads up: currently http://localhost:4200/ will not take you to the homepage, you need to add http://localhost:4200/products etc --> NEEDS FIXING AND POINT TO HOMEPAGE
