# Vue3 + Vite + JSONForm + KendoUI + Pinia Exam

Vue3 + Vite + JSONForm + KendoUI + Pinia Exam
<br/>
To check the code required for the exam: go to > src > views > profile >Profile.vue
<br/>
or go directly to the component: > src > forms > UpdateProfileForm.vue
<br/>
To Check the code for renderer: > src > components > renderers

Since a week is too long to finish the task, I added some other parts that will showcase my skills when it comes to Vue JS. I added a mockup/fake API to login and use a public API as well.

## Comes with

- [JSONForms](https://jsonforms.io/) JSON Schema based approach for creating forms.
- [Kendo UI](https://www.telerik.com/kendo-vue-ui) Comprehensive Vue UI Component Library
- [Vue Router](https://router.vuejs.org) for routing
- [Pinia](https://pinia.vuejs.org) for state management
- [Google Analytics](https://github.com/MatteoGabriele/vue-gtag) for analytics
- [TailwindCSS](https://tailwindcss.com/) Utility first for CSS Framework
- [Vitest](https://vitest.dev/) as testing framework
- [@vue/test-utils](https://test-utils.vuejs.org/) - Vue testing suite for Vue.js 3
- [Cypress](https://www.cypress.io/) for frontend test automation tool for regression testing, javascript component testing and E2E testing of web applications

## Best Practices Applied
1. Project Structure
2. Code Style (ESLint & Prettier)
3. Testing (E2E Testing and Unit Testing)

## Features

- Used JsonForms for writing complex forms using less code
- Created Custom Renderer with Kendo UI
- Used Vite for frontend tooling
- Highly performant and flexible
- Tested with some Unit and E2E tests
- Supports Dark Mode
- Written with Composition API in Vue3 and Typescript
- Support for Pinia with Vue Router and Axios
- Includes a Dev-Container for development in a Docker environment (optional)
- All API calls in a single file for easy customization (the Auth Store)
- Global event bus for easy communication with things like Analytics services
- Page analytics
- VSCode launch configuration so you can use breakpoints in your debugging

### Continuous Integration and Continuous Deployment

- Env file support
- Github Actions for CI to run unit and end-to-end tests
- Netlify TOML file for easy deployment on Netlify
- CI validation for missing translation keys
- Pre-push (or pre-commit if you want) hooks for linting and testing right before pushing
- Secrets leak detection during lint process

## Project Setup/Configuration

This Frontend is actively tested with and recommends using Node 20.10.x

## ⚒ How to Install

Clone the repo:

```bash
$ git clone --depth 1 git@github.com:ratribiana/vue3-vite-typesript-jsonform-kendoui.git
$ cd vue3-vite-typesript-jsonform-kendoui
```

Install dependencies:
```bash
$ yarn install
```

Make sure to have `.env.development` and fill in the values.

```sh
VITE_APP_NAME="Vue3 + Vite + JSONForm + KendoUI + Pinia Exam"
VITE_GA_MEASUREMENT_ID=G-KYHSG71EHT
VITE_APP_URL=http://localhost:8080
VITE_API_URL=http://localhost:8080/
VITE_API_DUMMY_BASE_URL=https://dummyjson.com
VITE_API_DUMMY_MEDIA_URL=https://cdn-dev.heros.xyz
NODE_ENV=development
```

Install KendoUI License Key

```sh
npx kendo-ui-license activate
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

## To Login, use this credentials

```sh
admin@demo.com
admindemo
```