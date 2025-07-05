# STBEveryWhereEspaceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## 🚀 Running the Angular App with Docker Compose

You can run this Angular project using Docker Compose in **production** or **development** mode.

---

### 📦 Production Mode (Static Build + Nginx)

1. Ensure you have a `Dockerfile`, `nginx.conf`, and `docker-compose.yml` in the root directory.
2. Replace the placeholder `<your-app-name>` in the Dockerfile with your actual Angular app name (the folder inside `dist/` after build).
3. Build and start the container:

`docker-compose up --build`

yaml
Copier
Modifier

4. Open your browser and go to:  
`http://localhost:4200`

This serves the optimized production build using Nginx.

---

### 🔄 Development Mode (Live Reload)

1. Create a `Dockerfile.dev` and `docker-compose.dev.yml` for the development environment.
2. Run the app in development mode with live reload:

`docker-compose -f docker-compose.dev.yml up --build`

yaml
Copier
Modifier

3. Open your browser and go to:  
`http://localhost:4200`

This runs the Angular CLI development server inside Docker with hot reloading.

---
README.md
Affichage de README.md en cours...