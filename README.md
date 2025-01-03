# voyageVista

Property Pulse is a comprehensive property rental website designed to facilitate seamless connections between property owners and potential renters. Our platform allows property owners to list their properties for rent on an hourly, weekly, or monthly basis, providing flexibility to meet diverse rental needs

---

## Table of Contents

- [Pre requisites](#pre-requisites)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)

---

## Pre requisites

1. **MongoDB Account**
2. **Cloudinary Account**
3. **Google GCP Account**

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Niraj21611/property-pulse.git
   cd property-pulse
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create .env file**

   ```bash
   NEXT_PUBLIC_DOMAIN = http://localhost:3000
   NEXT_PUBLIC_API_DOMAIN = http://localhost:3000/api
   MONGO_URI = // mongoDb connection string
   GOOGLE_CLIENT_ID = // Google oAuth client id
   GOOGLE_CLIENT_SECRET = // Google oAuth client secret key
   NEXTAUTH_URL = http://localhost:3000
   NEXTAUTH_URL_INTERNAL = http://localhost:3000
   NEXTAUTH_SECRET = // NextAuth secret key
   CLOUDINARY_CLOUD_NAME = // cloudinary storage name
   CLOUDINARY_CLOUD_API = // cloudinary api
   CLOUDINARY_CLOUD_API_SECRET = // cloudinary api secret
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **View the project in your browser**:
   ```bash
   Open `http://localhost:3000` in your preferred browser.
   ```

---

## Technologies Used

- **NextJS**: For building the user interface and api endpoints.
- **Tailwind CSS**: For styling and responsiveness.
- **HTML**: For structuring the application.
- **MongoDB**: For seamless storage operations.
- **Google oAuth**: For authentication and authorization.
- **Cloudinary**: For image storage.

---

## Features

- Implemented secure authentication and authorization using google oAuth
- Used nextJS's file based routing for creating api endpoints 
- Managed state using react's Context API
- Implemented messaging enquiry functionality for connecting buyers and owners

---

## Folder Structure

```plaintext
src/
├── app/            # Main application directory
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable React components
├── config/         # Configuration file's
├── context/        # Application global state
├── models/         # MongoDB schema models
├── utils/          # Self defined hooks
└── ...             # Other necessary files
```

## API Endpoints

```plaintext
1. api/properties
    - GET - Gives all properties present in the database
        - Connect Database
        - find properties through Property model
    - POST - Adds new property to existing properties in database
        - Connect Database
        - Check is user session is available or not
        - If available retrieve form data from the request
        - Make separate function to upload images to cloudinary and get that url
        - save newly added property to database

2. api/properties/:id
    - GET - retrieves single property by taking an property id
        - Connect Database
        - Find property by taking id from params
    - DELETE - Delete single property by taking an property id
        - Take property id from params
        - Check if user session is available or not
        - Connect Database
        - Find if that property exists or not
        - Check if that property owner is same as session user
        - Delete property from database
    - PUT - Refactors single property by taking an property id
        - Check if user session is available or not
        - Connect Database
        - Take property id from params
        - Retrieve updated form data from request
        - Find particular property by given id
        - Verify Ownership
        - Prepare updated property data in form of object
        - Update property in database

3. api/properties/search
    - GET - Returns properties based on searched query
        - Connect Database
        - Retrieve search params from request.url
        - Prepare regExp query giving results based on single char
        - Check propertyType is not All
        - Find varying results from the database

4. api/properties/user/:userId
    - GET - Returns properties having given userId
        - Connect Database
        - get userId from params
        - Find properties using model based on owner == userId

5. api/bookmark
    - GET - Returns all bookmarked properties by an user
        - Connect Database
        - Check if user is logged in or not based on session
        - Find that user based on userId retrieved from session
        - Get all properties present in users bookmarks array
    - POST - Add specified property to users bookmarks array
        - Connect Database
        - Get property Id from request
        - Check if user is logged in or not based on session
        - Get that user using user model based on session user id
        - Check if user bookmarks array includes that property Id
        - If includes then remove else add
        - Save that user in database

6. api/bookmark/check
    - POST - Returns true if property is present in user bookmarks array
        - Connect Database
        - Retrieves property Id from request
        - Check if session is active
        - Find that user based on user Id returned by session
        - Return isBookmarked as response if property ID is present in bookmarks array

7. api/messages
    - GET - Returns all the messages received by the user
        - Connect DB
        - Authenticate user session and retrieve user ID
        - Find all the messages using user id and populate username of sender and property
    - POST - Adds new message to messages collection
        - Connect DS
        - Receive data from the api request
        - Authenticate user session
        - Validate if user is not the property owner
        - Prepare the data object and save it to message collection

8. api/messages/:id
    - PUT - Updates the message to read and unread
        - Connect DB
        - Authenticate the current session
        - Find the message using the id retrieved through params
        - Change the message read accordingly and save updated message
    - DELETE - Deletes the single message
        - Connect DB
        - Authenticate the current session
        - Find the message using the id retrieved through params
        - Delete the message from the collection

9. api/messages/unread-count
    - GET - Gives the message whose read is true
        - Connect DB
        - Authenticate the current session
        - Store the count of message whose read is true

1.  api/auth/[…nextAuth]
    - GET & POST - Provides authentication based on authOptions given by user
```

---
