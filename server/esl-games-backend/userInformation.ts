import { APIGatewayProxyHandler } from "aws-lambda";
import { createConnection } from "mysql2";

//const mysql = require('mysql2')

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

interface UserInformation {
    fullName: string
    mobileNumber: string
    emailAddress: string
    brandNewsletter: string
    ulpNewsletter: string
    userTransaction: string
}

export const userInformation: APIGatewayProxyHandler = async (event) => {
    const body = JSON.parse(event.body ?? "") as UserInformation

    connection.query(
        'INSERT INTO testTable (Name, MobileNumber, EmailAddress, BrandNewsletter, ULPNewsletter, UserTransaction) VALUES (?, ?, ?, ?, ?, ?)',
        [body.fullName, body.mobileNumber, body.emailAddress, body.brandNewsletter, body.ulpNewsletter, body.userTransaction]
    )

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Insert Successful' })
      }
}