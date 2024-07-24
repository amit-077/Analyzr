const express = require("express");
const cors = require("cors");
const { model } = require("./gemini");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/analyze", async (req, res) => {
  try {
    let { code } = req.body;
    const answer = await model.generateContent(
      `Analyze the time complexity and space complexity of below code. In response, just give the time and space complexity and nothing else. And give precise time and space complexity. Like if it's O(2N) don't give O(N), give O(2N).${code}`
    );
    let complexity = answer.response.text();
    const timeMatch = complexity.match(/Time complexity:\s*([^\s]+)/i);
    const spaceMatch = complexity.match(/Space complexity:\s*([^\s]+)/i);

    const result = {
      time: timeMatch ? timeMatch[1] : "Unknown",
      space: spaceMatch ? spaceMatch[1] : "Unknown",
    };

    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
