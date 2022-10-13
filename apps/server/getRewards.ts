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

interface GetRewards {
    score: number
    reward_type: string
}

export const getRewards: APIGatewayProxyHandler = async (event) => {
    try {
        const body = JSON.parse(event.body ?? "") as GetRewards

        if (body.score >= 5) {

            let reward = await mysql.query('SELECT id, code FROM rewards WHERE type = ?',[body.reward_type])

            await mysql.end()

            return {
                statusCode: 200,
                body: JSON.stringify({message: reward})
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