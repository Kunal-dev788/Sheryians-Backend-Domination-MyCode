const express = require('express');
const app = express();
const mongooseConnection = require("./config/mongoose");
const User = require('./models/User');

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect to signup page by default
app.get("/", (req, res) => res.redirect("/create"));

// Signup page
app.get("/create", (req, res) => {
    res.render("create", { error: req.query.error || null });
});

// Handle Signup
app.post("/create", async (req, res) => {
    const { email, password } = req.body;
    const username = `${email.split('@')[0]}_${Date.now()}`;

    try {
        await User.create({ username, email, password });
        res.redirect(`/${encodeURIComponent(username)}`);
    } catch (err) {
        console.error("Signup Error:", err);
        res.redirect(`/create?error=${encodeURIComponent('Signup failed')}`);
    }
});

// Login page
app.get("/login", (req, res) => {
    res.render("login", { error: req.query.error || null });
});

// Check Login
app.post("/checkLogin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.redirect("/login?error=User not found");

        if (foundUser.password !== password) {
            return res.redirect("/login?error=Invalid credentials");
        }

        res.redirect(`/${encodeURIComponent(foundUser.username)}`);
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Server error");
    }
});

// Show create Hisaab form
app.get("/:user/createHisaab", async (req, res) => {
    const username = req.params.user;
    try {
        const foundUser = await User.findOne({ username });
        if (!foundUser) return res.status(404).send("User not found");

        // Pass actual username to EJS so links/forms use correct value
        res.render("createHisaab", { user: foundUser.username });
    } catch (error) {
        console.error("Error loading Hisaab form:", error);
        res.status(500).send("Server error");
    }
});

// Handle Hisaab creation
app.post("/:user/createHisaab", async (req, res) => {
    const { title, description, isEncrypt, passcode } = req.body;
    const username = req.params.user;

    try {
        const foundUser = await User.findOne({ username });
        if (!foundUser) return res.status(404).send("User not found");

        foundUser.hisaabs.push({
            title,
            description,
            isEncrypt: !!isEncrypt,
            passcode: isEncrypt ? passcode : undefined
        });

        await foundUser.save();
        console.log(`✅ New Hisaab created for ${username}`);

        res.redirect(`/${encodeURIComponent(username)}`);
    } catch (error) {
        console.error("Error creating Hisaab:", error);
        res.status(500).send("Server error");
    }
});

// View Hisaab Route
app.get("/:username/viewHisaab/:hisaabId", async (req, res) => {
    const username = req.params.username;
    try {
        const foundUser = await User.findOne({ username })
        if (!foundUser) return res.status(404).send("User not found");
        const foundHisaabByID = await User.findOne(
            { username, "hisaabs._id": req.params.hisaabId },
            { "hisaabs.$": 1 } // only return the matched hisaab
        );
        res.render("view", { hisaabs: foundHisaabByID.hisaabs[0], user: foundUser })
    } catch (error) {
        console.error("Error on Fetching Hisaab:", error);
        res.status(500).send("Server error");
    }
})

// Edit / Update Hisaab
app.get("/:username/editHisaab/:hisaabId", async (req, res) => {
    const username = req.params.username
    try {
        // const foundUser = await User.findOne({ username })
        // if (!foundUser) return res.status(404).send("User not found..")
        const foundHisaabByID = await User.findOne(
            { username, "hisaabs._id": req.params.hisaabId },
            { "hisaabs.$": 1 }
        );
        res.render("edit", { hisaab: foundHisaabByID.hisaabs[0] })
    } catch (error) {

    }
})

// Edit / Update Hisaab
app.post("/:username/editHisaab/:hisaabId", async (req, res) => {
    const { title, description } = req.body;
    const username = req.params.username;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username, "hisaabs._id": req.params.hisaabId },
            {
                $set: {
                    "hisaabs.$.title": title,
                    "hisaabs.$.description": description
                }
            },
            { new: true } // returns updated document
        );

        if (!updatedUser) return res.status(404).send("Hisaab not found");
        res.redirect(`/${encodeURIComponent(username)}/viewHisaab/${req.params.hisaabId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// Delete Hisaab
app.get("/:username/deleteHisaab/:hisaabId", async (req, res) => {
    const { username, hisaabId } = req.params;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $pull: { hisaabs: { _id: hisaabId } } },
            { new: true }
        );

        if (!updatedUser) return res.status(404).send("User or Hisaab not found");

         res.redirect(`/${encodeURIComponent(username)}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



// Dashboard - must be last
app.get("/:user", async (req, res) => {
    const username = req.params.user;
    try {
        const foundUser = await User.findOne({ username });
        if (!foundUser) return res.status(404).send("User not found");

        // Pass user object so EJS can link correctly
        res.render("index", { user: foundUser, hisaabs: foundUser.hisaabs });
    } catch (err) {
        console.error("Dashboard Error:", err);
        res.status(500).send("Server error");
    }
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
