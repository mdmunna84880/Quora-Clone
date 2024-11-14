const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Md Munna",
    content:
      "I can do anything means anything.",
  },
  {
    id: uuidv4(),
    username: "Ajit Kumar",
    content: "I am straight forward person.",
  },
  {
    id: uuidv4(),
    username: "Lakshman Kumar",
    content: "You are the most intelligent in SSPL.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  // console.log(post);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  let editPost = post.content = newContent;
  console.log(editPost);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
    // res.send("delete request worked");
})

app.listen(port, () => {
  console.log("Application is listening");
});
