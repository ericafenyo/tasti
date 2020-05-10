# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-alpha3] - 2020-05-10
### Added
-   New api endpoint for creating recipes
-   Use mysql docker image for local database test
-   Add new vue ui components
-   Use a separate mail module for handling emails
-   Add github actions for ci/cd
-   Handle migrations using typeorm
-   Improvements and bug fixes

### Changed
-   Leverage the advantage of `v-model` for two-way data-binding in vue components

## [1.0.0-alpha2] - 2020-02-16

### Added
-   New design system with polished UI components
-   New vue components: Login, Register, Alert, NavigationBar, etc.
-   User account creation: sign up, login and reset password
-   Support for localization and translation
-   Start using changelog to track relevant changes [[59f5ab3]](https://github.com/ericafenyo/tasti/commit/59f5ab35ef47faa359b8d7f9ee55db47ab4bd24e)

### Changed
-   Migrate basic express app to Nestjs
-   Refactor JavaScript codes to TypeScript
-   Add [ZenHub](https://www.zenhub.com/) in addition to Github projects for project management.
-   Update documentation [[e5c3716]](https://github.com/ericafenyo/tasti/commit/e5c3716a56a92524ca3944f6c1c41812004c2b1f)


### Removed
-   Old implementation of the api server in version 1.0.0-alpha".
-   Storybook implementation used for Atomic design [[68cb3e5]](https://github.com/ericafenyo/tasti/commit/68cb3e5da168182be280f538a0cda897719129fd)

## [1.0.0-alpha] - 2019-07-16

### Added
-	Add basic vue ui components:
    -   Headline   
    -   Avatar 
    -   Button
    -   Input
    -   Modal  
    -   Tabs  
    -   Icons
    -   Links
    -   PhotoUpload

-   Add user and recipe routes to express api server
-   Storybookjs for isolating the component design from the main app [[217a600]](https://github.com/ericafenyo/tasti/commit/217a60086abbad1afb650a1a3058ee046254be23)