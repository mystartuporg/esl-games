import { APIGatewayProxyHandler } from 'aws-lambda'
import { ServerlessMysql } from 'serverless-mysql'

const axios = require('axios')
const mysql: ServerlessMysql = require('serverless-mysql')({
  config: {
    host: process.env.ENDPOINT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  library: require('mysql2'),
})

interface UserTran {
  reward_id: string
  user_id: string
}

export const userTransaction: APIGatewayProxyHandler = async (event) => {
  try {
    let body = JSON.parse(event.body ?? '') as UserTran

    let currentDate = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(currentDate.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    let today = new Date(currentDate)
    today.setHours(0, 0, 0, 0)

    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    let refNumDate =
      year.toString() + month.toString().padStart(2, '0') + day.toString()

    let userCount: { count: number }[] = await mysql.query(
      'SELECT COUNT(id) + 1 as count FROM transactions WHERE date BETWEEN ? and ?',
      [today, tomorrow]
    )

    let refNumID = userCount[0].count.toString().padStart(3, '0')

    let refNum = refNumDate + '-' + refNumID

    // TODO: add proper types
    // GET USER HERE
    const user = await mysql.query('SELECT * FROM users WHERE id = ?', [
      body.user_id,
    ])

    // TODO: add proper types
    // GET REWARD HERE
    const reward = await mysql.query('SELECT * FROM rewards WHERE id = ?', [
      body.reward_id,
    ])

    // TODO: add proper types
    const semaphoreData = JSON.stringify({
      apikey: process.env.SEMAPHORE_API_KEY,
      // @ts-ignore
      number: user[0].mobile,
      // @ts-ignore
      message: `Congratulations! Thanks for playing the game! Here's your Php 100 ${reward[0].type} GC. You can redeem it here: https://gft.ph/v3tNtdTrjl. Ref No. ${refNum}`,
      sendername: process.env.SEMAPHORE_SENDER_NAME,
    })

    // TODO: add proper types
    // SEND SMS HERE
    const semaphoreResponse = await axios({
      method: 'POST',
      url: 'https://api.semaphore.co/api/v4/messages',
      headers: {
        'Content-Type': 'application/json',
      },
      data: semaphoreData,
    })

    // TODO: Add proper handling incase sending fails
    console.log(semaphoreResponse.data)

    await mysql.query(
      'INSERT INTO transactions (reference_no, user_id, reward_id, date) VALUES (?, ?, ?, ?)',
      [refNum, body.user_id, body.reward_id, currentDate]
    )

    await mysql.end()

    return {
      statusCode: 200,
      body: JSON.stringify({ referenceNumber: refNum }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    }
  }
}
