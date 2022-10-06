import { APIGatewayProxyHandler } from "aws-lambda";

// const mysql = require('serverless-mysql')({
//     config: {
//         host: process.env.ENDPOINT,
//         database: process.env.DATABASE,
//         user: process.env.USERNAME,
//         password: process.env.PASSWORD
//     }
//   });

interface UserInfo {
    fullName: string
    mobileNumber: string
    emailAddress: string
    //brand_Newsletter: boolean
    //ulp_Newsletter: boolean
    //userTransaction: string
}

export const userInformation: APIGatewayProxyHandler = async (event, context) => {
    const body = JSON.parse(event.body ?? "") as UserInfo

    // let results = await mysql.query('INSERT INTO testTable (Name, MobileNumber, EmailAddress) VALUES (?, ?, ?)', [body.fullName, body.mobileNumber, body.emailAddress/*, body.brand_Newsletter, body.ulp_Newsletter, body.userTransaction*/])

    // await mysql.end()

    // return results

    return {
        statusCode: 200,
        body: JSON.stringify({
            fullName: body.fullName,
            mobileNumber:body.mobileNumber,
            emailAddress: body.emailAddress
        })
    }
}