const mailgun = require("./mailgun");

const mailList = async (req, res) => {
  const email = req.params.email;
  try {
    const newMember = await mailgun.lists.members.createMember(
      process.env.MAILGUN_DOMAIN,
      {
        address: email,
        name: "shop4all newsletter",
        // vars: JSON.stringify({age: 27}),
        subscribed: "yes",
        upsert: "yes",
      }
    );
    return res.status(200).json({
      status: "success",
      data: newMember,
      message: "suscribed successfully",
    });
  } catch (err) {
    return res.status(501).json({ error: err.message });
  }
};

module.exports = mailList;
