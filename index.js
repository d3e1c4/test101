const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;


let registrations = [];

function validateRegistration(req, res, next) {
    const { participantName, email, workshopTitle } = req.body;

    if (!participantName || !email || !workshopTitle) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    next();
}


app.get("/", (req, res) => {
    res.send("Server is working!");
});


app.post("/registrations", validateRegistration, (req, res) => {
    const { participantName, email, workshopTitle } = req.body;

    const newRegistration = {
        id: registrations.length + 1,
        participantName,
        email,
        workshopTitle
    };

    registrations.push(newRegistration);

    res.status(201).json(newRegistration);
});

app.get("/registrations/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const registration = registrations.find(r => r.id === id);

    if (!registration) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json(registration);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});