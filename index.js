const express = require("express");
const cors = require("cors");
const { model } = require("./gemini");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());

let images = {
  "O(1)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722935357/O_1_burhkm.png",
  "O(logn)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722926813/O_LogN_zowhsp.png",
  "O(2^n)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927899/O_2_N_r64s53.png",
  "O(N!)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927930/O_n_t1ohrr.png",
  "O(N)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722928060/O_N_tu6bxl.png",
  "O(N^2)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927867/O_n_2_c03yqc.png",
  "O(N^3)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927868/O_N_3_b0pcff.png",
  "O(NlogN)":
    "https://res.cloudinary.com/dh2wmc2jz/image/upload/v1722927868/O_NLogN_c9vlny.png",
};

let str = Object.entries(images)
  .map(([key, value]) => `${key}: ${value}`)
  .join(", ");

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/analyze", async (req, res) => {
  try {
    let { code } = req.body;
    const answer = await model.generateContent(
      `Analyze the overall time complexity and overall space complexity of below code. The code can be in any language like Java, C++, Python, etc. Your task is to analyze the code deeply and give its time complexity and space complexity correctly. If the code includes any inbuilt method, consider time and space complexity of that too in the answer. Like if I have used sort() method of STL in C++, it has time complexity of O(NLogN), then you should consider that too. In response, just give the overall time and overall space complexity and nothing else. And give precise time and space complexity. Like if it's O(2N) don't give O(N), give O(2N). Don't use any kind of markdown syntax in answer. Follow the below given template in single quotes in response. Time Complexity: ____ Space Complexity: ____. Don't include any single, double quotes in respone. Here I have given complexity images below in javascript object form, so give appropriate image urls for appropriate complexity in response\n. ${str}. Below is the code\n. ${code}\n. Keep in mind, give time and space complexity along with their respective image urls. Give an object in response, in which there will be 4 fields, 1) Time complexity 2) Time complexity Image 3) Space complexity 4) Space complexity Image. Just give this object in response and nothing else.`
    );
    let complexity = answer.response.text();
    try {
      const complexityJSONString = complexity.replace(/'/g, '"');
      const complexity1 = JSON.parse(complexityJSONString);

      const {
        "Time Complexity": timeComplexity,
        "Time Complexity Image": timeComplexityImage,
        "Space Complexity": spaceComplexity,
        "Space Complexity Image": spaceComplexityImage,
      } = complexity1;

      console.log("Time Complexity:", timeComplexity);
      console.log("Time Complexity Image:", timeComplexityImage);
      console.log("Space Complexity:", spaceComplexity);
      console.log("Space Complexity Image:", spaceComplexityImage);
      res.status(200).send({
        timeComplexity,
        timeComplexityImage,
        spaceComplexity,
        spaceComplexityImage,
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
