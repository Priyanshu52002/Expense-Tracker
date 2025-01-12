const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        console.log(user);
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: "Signup successful", success: true });
    } catch (err) {
        res.status(500).json({ error:err.message, success: false });
    }
};

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("debug1",req.body);
        let user = await User.findOne({ email });
        // console.log("debug 2",user);
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        let name=user.name;
        res.status(200).json({ token, name});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { UserSignup, UserLogin };
