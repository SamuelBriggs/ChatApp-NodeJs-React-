const express = require('express')
const app = express()
const dbConfig = require("./dbConfig");
const port = process.env.PORT || 5003 ;

const usersRoutes = require("./routes/usersRoutes")
const chatsRoutes = require("./routes/chatsRoutes")
const messagesRoutes = require("./routes/messageRoute")
app.use(express.json());
app.use("/api/users", usersRoutes)
app.use("/api/chats", chatsRoutes)
app.use("/api/messages", messagesRoutes)
app.listen(port, () => console.log(`Server running on port ${port}`));
