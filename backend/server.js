const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	User = require("./models/User"),
	router = require("./routes/index"),
	cors = require("cors");

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/tracklog_plus_plus",
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

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
