const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	User = require("./models/User"),
	router = require("./routes/index"),
	path = require("path"),
	cors = require("cors"),
	config = require("./config");

const { DB_PASS } = config;

const connection = `mongodb+srv://levihicks:${DB_PASS}@tracklogplusplus-dxv7m.mongodb.net/tracklog_plus_plus?retryWrites=true&w=majority`;
mongoose.connect(
	connection || "mongodb://localhost:27017/tracklog_plus_plus",
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(express.json());

app.set("port", process.env.PORT || 5000);
//app.use(express.session({ secret: "keyboard cat" }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(cors());

app.use("/", router);

app.use(express.static(path.join(__dirname, "../build"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build"));
})

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
