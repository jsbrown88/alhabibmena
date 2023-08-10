# Dental Interpretation Application API Documentation

## Overview

This document provides detailed information about the RESTful APIs used in the Dental Interpretation Application. The application is designed to bridge the communication gap between dental professionals and patients by translating complex dental remarks into a clear and structured explanation.

## Base URL

All API requests are made to:

```
http://<hostname>:<port>/api
```

## Authentication

All API requests require the use of a generated API key. You can generate an API key from the admin dashboard. API keys carry many privileges, so be sure to keep them secure. Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, etc.

## Errors

Our API returns standard HTTP error status codes for failed requests. The body of the response will contain more detailed information about the error.

## Endpoints

### Upload Document

- **URL:** `/documents`
- **Method:** `POST`
- **Description:** Uploads a PDF or DOCX document.
- **Request Body:**

```json
{
  "file": "<base64 encoded file>"
}
```

- **Success Response:**

```json
{
  "message": "UPLOAD_SUCCESS",
  "documentId": "<document id>"
}
```

- **Error Response:**

```json
{
  "message": "UPLOAD_FAILURE",
  "error": "<error details>"
}
```

### Get Translated Text

- **URL:** `/documents/:id`
- **Method:** `GET`
- **Description:** Retrieves the translated text of a document.
- **URL Parameters:** `id=[string]` where `id` is the ID of the document.
- **Success Response:**

```json
{
  "message": "TRANSLATION_SUCCESS",
  "translatedText": "<translated text>"
}
```

- **Error Response:**

```json
{
  "message": "TRANSLATION_FAILURE",
  "error": "<error details>"
}
```

## Rate Limiting

To protect the system from being overwhelmed by requests, we implement rate limiting. If you exceed the number of allowed requests in a given time period, you will receive a `429 Too Many Requests` response.

## Support

If you encounter any issues or require further assistance, please contact our support team at support@dentalinterpretationapp.com.