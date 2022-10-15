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
        let result: Result[] = await mysql.query(
            `SELECT 
                R.id,
                R.type,
                R.code
            FROM
                rewards AS R
                    LEFT JOIN
                transactions AS T ON R.id = T.reward_id
            WHERE
                T.reward_id IS NULL
            GROUP BY
                R.type
            ;`
        )
        return{
            statusCode: 200,
            body: JSON.stringify({result})
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: error})
        }
    }
}