var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var http = require("http");
var debug = require("debug")("dyeing-quote-server:server");

var index = require("./routes/index");
var users = require("./routes/users");
var articles = require("./routes/articles");
var news = require("./routes/news");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// DB connection through Mongoose
const options = {
  keepAlive: 30000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
}; // Just a bunch of options for the db connection
mongoose.Promise = global.Promise;
// Don't forget to substitute it with your connection string
mongoose.connect(
  "mongodb://localhost/dyeingquote",
  options
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", index);

// user api
app
  .route("/users")
  .get(users.getUsers)
  .post(users.createUser);

app.post("/users/login", users.userLogin);

app.post("/users/password_reset", users.resetPassword);

app
  .route("/user/:id")
  .get(users.getUser)
  .post(users.updateUser);

app.get("/articles", articles.getArticles);
app.get("/article/:id", articles.getArticle);

app.get("/news", news.getLatestNews);
app.get("/news/:id", news.getLatestNews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

var server = http.createServer(app);
var io = require("socket.io")(server);

var userSockets = {};
var serviceSockets = {};
var userCountOfService = [];

io.on("connection", function(socket) {
  socket.on("userToService", function(from, to, msg) {
    if (to) {
      var target = userSockets[from];
      if (target) {
        target.emit("msgFromUser", from, to, msg);
      }
    } else {
      userCountOfService.sort(function(a, b) {
        return a.userCount - b.userCount;
      });
      userCountOfService[0].userCount++;
      var target = userSockets[from];
      if (target) {
        target.emit("msgFromUser", from, userCountOfService[0].id, msg);
      }
    }
  });

  socket.on("serviceToUser", function(from, to, msg) {
    var target = userSockets[to];
    if (target) {
      target.emit("msgFromService", from, to, msg);
    }
  });

  socket.on("join", function(userType, id) {
    if (userType === 0) {
      userSockets[id] = socket;
    } else if (userType === 1) {
      serviceSockets[id] = socket;
      userCountOfService.push({ id: id, userCount: 0 });
    }
  });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
