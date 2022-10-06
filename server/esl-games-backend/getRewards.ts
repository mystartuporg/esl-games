// import { APIGatewayProxyHandler } from "aws-lambda";
// import { createConnection, OkPacket } from "mysql2";

//const mysql = require('mysql2')

// const mysql = require('serverless-mysql')({
//     config: {
//         host: process.env.ENDPOINT,
//         database: process.env.DATABASE,
//         user: process.env.USERNAME,
//         password: process.env.PASSWORD
//     }
//   });

interface UserInformation {
    fullName: string
    userTransaction: string
}

// export const getRewards: APIGatewayProxyHandler = async (event) => {
//     const body = JSON.parse(event.body ?? "") as UserInformation
//     let statusCode: number = 200
//     let messageBody: string = ""

//     connection.query(
//         'SELECT GameID, Score FROM testTable WHERE Name = ? AND UserTransaction = ?',
//         [body.fullName, body.userTransaction],
//         function(err, results: OkPacket){
//             if (results.affectedRows === 0) {
//                 statusCode = 404
//                 messageBody = JSON.stringify({ message: 'Not found' })
//             }
//             else {
//                 statusCode = 200
//                 messageBody = JSON.stringify(results)
//             }
//         }
//     )
//     return {
//         statusCode,
//         body: messageBody
//     }
// }

exports.getRewards = async (event, context) => {
    const body = JSON.parse(event.body ?? "") as UserInformation

    let results = await mysql.query('SELECT GameID, Score FROM testTable WHERE Name = ? AND UserTransaction = ?', [body.fullName, body.userTransaction])

    await mysql.end()

    if (results === 0){
        return{
            statusCode: 404,
            body: 'Not Found'
        }
    }

    return results
}