// Save this as api/makeCall.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { target, spoof } = req.body;

    // Your static credentials
    const apiKey = "5320c2ac4a1d28fadbdf8c03534a891d";
    const businessId = 15065;
    const userId = 296493;
    const myStaticNumber = 18889487160;

    const payload = {
        userid: userId,
        businessid: businessId,
        businessId: businessId,
        apikey: apiKey,
        apiKey: apiKey,
        call: "updateUserSettings3",
        calleridName: "BetaVoip",
        calleridNumber: parseInt(spoof.replace(/\D/g, '')), // The number you want to spoof
        smsnumber: myStaticNumber,                          // Your static Kixie bridge
        firstName: "Beta",
        lastName: "Voip",
        countrycode: "US"
    };

    try {
        const kixieRes = await fetch('https://api2.kixie.com/itn/legacy/updateUserSettings3', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "X-API-Key": apiKey,
                "X-Ver": "2.97.0"
            },
            body: JSON.stringify(payload)
        });
        
        const data = await kixieRes.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
