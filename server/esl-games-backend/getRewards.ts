import { APIGatewayProxyHandler } from "aws-lambda";
import { createConnection, OkPacket } from "mysql2";

//const mysql = require('mysql2')

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

  interface UserInformation {
    fullName: string
    userTransaction: string
}

export const getRewards: APIGatewayProxyHandler = async (event) => {
    const body = JSON.parse(event.body ?? "") as UserInformation
    let statusCode: number = 200
    let messageBody: string = ""

    connection.query(
        'SELECT GameID, Score FROM testTable WHERE Name = ? AND UserTransaction = ?',
        [body.fullName, body.userTransaction],
        function(err, results: OkPacket){
            if (results.affectedRows === 0) {
                statusCode = 404
                messageBody = JSON.stringify({ message: 'Insert Successful' })
            }
            else {
                statusCode = 200
                messageBody = JSON.stringify(results)
            }
        }
    )
    return {
        statusCode,
        body: messageBody
    }
}