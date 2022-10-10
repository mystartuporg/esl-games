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

interface UserTran {
    reward_id: string
    user_id: string
}

export const userTransaction: APIGatewayProxyHandler = async (event) => {

    var body = JSON.parse(event.body ?? "") as UserTran

    var currentDate = new Date()
    var tomorrow = new Date()
    tomorrow.setDate(currentDate.getDate()+1)
    tomorrow.setHours(0, 0, 0, 0)
    var today = new Date(currentDate).setHours(0, 0, 0, 0)
    var year = currentDate.getFullYear()
    var month = currentDate.getMonth() + 1
    var day = currentDate.getDate()
    var refNumDate = year.toString() + month.toString().padStart(2, '0') + day.toString()

    var userCount: {count: number}[] = await mysql.query('SELECT COUNT(id) + 1 as count FROM transactions WHERE date BETWEEN ? and ?', [today, tomorrow])

    var refNumID = userCount[0].count.toString().padStart(3, '0')

    var refNum = refNumDate + '-' + refNumID

    await mysql.query('INSERT INTO transactions (reference_no, user_id, reward_id, date) VALUES (?, ?, ?, ?)', [refNum, body.user_id, body.reward_id, currentDate])

    await mysql.end()

    return {
        statusCode: 200,
        body: JSON.stringify({referenceNumber: refNum})
    }
}