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
    code: string
}
export const getRewards: APIGatewayProxyHandler = async (event) => {
    try {
        const body = event.queryStringParameters
        if (body == undefined) {
            throw 'Reward Type is undefined'
        }
        let result: Result[] = await mysql.query(
            'SELECT * FROM rewards WHERE type = ? AND id NOT IN (SELECT reward_id FROM transactions) AND id IN (SELECT MIN(id) FROM rewards GROUP BY type)',
            [body.reward_type]
        )
        return{
            statusCode: 200,
            body: JSON.stringify({reward_id: result[0].id, reward_code: result[0].code})
        }
    }
    catch (error) {
        return {
                    statusCode: 500,
                    body: JSON.stringify({message: error})
                }
    }
}