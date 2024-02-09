# Book Store Application

## Key Features

- **User Authentication:** Users can sign up for a new account and log in.
- **Book Management:** Admin users can add, update, and delete books.
- **Book Search:** Users can search for books by title, author, or genre.
- **Book Purchase:** Users can purchase books and view their purchase history.
- **Book Reviews:** Users can add reviews and ratings for books.
- **Email Notifications:** Users receive email notifications for successful purchases.
- **Error Handling:** Implementation of error handling for various scenarios such as invalid requests and server errors.
- **Logging:** Logging of requests and errors for debugging and monitoring purposes.
- **Security Measures:** Implementation of secure authentication and authorization mechanisms.

## Technical Stack

- **Framework:** Express
- **Database:** Postgres
- **ORM:** Sequelize
- **Authentication:** JWT

## Logic for Computing sellCount

The sellCount attribute is computed dynamically based on the purchase history of each book. Whenever a book is purchased, the sellCount for that book is incremented accordingly. This ensures that the sellCount attribute is always up-to-date and reflects the actual number of sales for each book.

## Mechanism for Sending Email Notifications

Email notifications are sent to authors using a cron job to handle them asynchronously. At the end of very month, send an email to the corresponding author with the revenue details for the current month, current year, and total revenue. This ensures that the email notifications are sent in a timely manner without affecting the performance of the application.

## Database Design and Implementation Choices

- **Users Table**: Contains information about users including their roles.
- **Books Table**: Stores information about books including their bookId, title, description, and price.
- **Book Authors Table**: Contains relation between books and authors.
- **Purchase History Table**: Records each purchase made including details such as purchaseId, bookId, userId, purchaseDate, price, and quantity.
- **Book Reviews Table**: Stores reviews for each book including details such as reviewId, bookId, userId, review, and rating.

The database design ensures data integrity and efficient querying for various operations such as user authentication, book management, purchase tracking, and revenue calculation

## Configuration

1. Create a `.env` file in the project root with the following variables:

### App_env The environment in which the application is running

```
 NODE_ENV=development
```

### Port for the server to run on

```
 PORT=4000
```

### Database connection details

```
DB_DIALECT= # The dialect of the database server
DB_HOST= # The hostname of the database server
DB_PORT= # The port number on which the database server is listening
DB_USERNAME= # The username of the database user
DB_PASSWORD= # The password of the database user
DB_NAME= # The name of the database
```

### JSON Web Token secret for authentication

```
JWT_SECRET= # jwt secret key
```

### Email configuration

```
SENDER_EMAIL= # email address of the sender
SENDER_PASSWORD= # password of the sender's email
```

## Running the Server

Execute the `npm run start:dev` command to run the server. The application will be accessible at `http://localhost:4000`.
