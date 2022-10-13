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

interface Result {
    id: number
    type: string
    code: string
}

export const getRewards: APIGatewayProxyHandler = async (event) => {
    try {
        const body = event.queryStringParameters

        if (body == undefined) {
            throw 'Body is undefined'
        }
        if (body && body.score && parseInt(body.score) >= 5) {

            let reward: Result[] = await mysql.query('SELECT * FROM rewards WHERE type = ?', [body.reward_type])

            await mysql.end()

            return {
                statusCode: 200,
                body: JSON.stringify({reward_id: reward[0].id, reward_code: reward[0].code})
            }
        }
        else {
            return {
                statusCode: 200,
                body: JSON.stringify({message: 'Insufficient Score'})
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: error})
        }
    }
}