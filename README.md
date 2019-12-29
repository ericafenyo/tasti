---
description: >-
  The Tasti API was created as part of a full-stack web development project and
  the source code is available for anyone to use.
---

# Introduction

### API URL

The API should always be accessed over SSL.

`https://api.ericafenyo.com/tasti`

### Verbs

| Verb | Description |
| :--- | :--- |
| `GET` | Select one or more items. Success returns `200` status code. |
| `POST` | Create a new item. Success returns `201` status code. |
| `PATCH` | Update and item. Success returns `200` status code. |
| `DELETE` | Delete an item. Success returns `200` or `204` status code. |

### Status Codes

 The API will respond with one of the following HTTP status codes.

| Code | Description |
| :--- | :--- |
| 200 | Success |
| 201 | Success - _new resource created \(POST\)_ |
| 204 | Bad Request - _request couldn't be parsed_ |
| 400 | Bad Request - _request couldn't be parsed_ |
| 401 | Unauthorised - _OAuth must be provided_ |
| 403 | Forbidden - _invalid API key or unapproved app_ |
| 404 | Not Found - _method exists, but no record found_ |
| 405 | Method Not Found - _method doesn't exist_ |
| 409 | Conflict - _resource already created_ |
| 500 | Server Error - _please open a support issue_ |
| 503 | Service Unavailable - _try again later_ |

### Required Headers

All `POST`, `PATCH`, and `DELETE` methods require Authentication. Some `GET`calls that returns user specific data also requires Authentication. Methods that 🔒 **require** Authentication will be indicated.

Your http request should take care of sending the required auth headers. Here's how the Bearer token should be sent.

| Header | Value |
| :--- | :--- |
| Authorization | Bearer \[ access\_token \] |

### Dates

All dates will be GMT and returned in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format like `2014-09-01T09:10:11.000Z`. Adjust accordingly in your app for the user's local timezone.

### Images

Coming soon

### Videos

Coming soon

