import { APIGatewayProxyHandler } from "aws-lambda";
import { ServerlessMysql } from "serverless-mysql";

const mysql: ServerlessMysql = require("serverless-mysql")({
    config: {
        host: process.env.ENDPOINT,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD
    },
    library: require( "mysql2" )
})

interface UserInfo {
    fullName: string
    mobileNumber: string
    emailAddress: string
    brand_Newsletter: boolean
    ulp_Newsletter: boolean
}

export const userInformation: APIGatewayProxyHandler = async (event) => {
    try {
        const body = JSON.parse(event.body ?? "") as UserInfo

        await mysql.query(
          'INSERT INTO users (name, mobile, email, newsletter_brand, newsletter_ulp) VALUES (?, ?, ?, ?, ?)',
          [body.fullName, body.mobileNumber, body.emailAddress, body.brand_Newsletter, body.ulp_Newsletter]
        )

        await mysql.end()

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Insert successful'})
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: error})
        }
    }
    



}