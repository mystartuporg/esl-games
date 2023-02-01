const axios = require('axios')
const mysql = require('serverless-mysql')({
  config: {
    host: process.env.ENDPOINT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  library: require('mysql2'),
})

const SMS_FORMAT = {
  'GCash': (code, refNum) => `Your eGift code for P100 is ${code}. Please go to http://gft.ph/gcash and request for a top-up. Ref No. ${refNum}`,
  'GrabFood': (code, refNum) => `Hi Waltermart! Unilever Philippines sent 1 eGift (P100) for GrabFood. Please open https://gft.ph/${code} for more details. Ref No. ${refNum}`,
  'Unilever': (code, refNum) => `Hi Waltermart! Unilever Philippines sent you a Gift of 1 Creamsilk Hair Treatment product. Ref No. ${refNum}`
}

export const userInformation = async (event) => {
  try {
    const body = JSON.parse(event.body ?? '')

    var result = await mysql.query(
      'INSERT INTO users (name, mobile, email, newsletter_brand, newsletter_ulp) VALUES (?, ?, ?, ?, ?)',
      [
        body.fullName,
        body.mobileNumber,
        body.emailAddress,
        body.brand_Newsletter,
        body.ulp_Newsletter,
      ]
    )

    await mysql.end()

    return {
      statusCode: 200,
      body: JSON.stringify({ id: result.insertId }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    }
  }
}

export const userTransaction = async (event) => {
  try {
    let body = JSON.parse(event.body ?? '')

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

    let userCount = await mysql.query(
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
      number: user[0].mobile,
      message: SMS_FORMAT[reward[0].type](reward[0].code, refNum),
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

export const getRewards = async (event) => {
  try {
    const body = event.queryStringParameters
    let result = await mysql.query(
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

    await mysql.end()

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    }
  }
}
