// export default async function getStaticProps(req, res) {
//     res.setHeader('Content-Type', 'text/html; charset=utf-8')
//     res.write(await fs.readFileSync(filename, 'utf-8'))
//     res.end()
//   }

  export default function getUserInfo(req, res) {
    var userInformation = req.body
    res.status(200).json({userInformation})
  }