import fs from "fs";

const filename = "public/assets/basketball/play.html";

export default async function getStaticProps(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(await fs.readFileSync(filename, "utf-8"));
  res.end();
}
