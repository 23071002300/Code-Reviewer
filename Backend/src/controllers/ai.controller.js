const aiService = require('../services/ai.service');

module.exports.getResponse = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService(code);
    res.send({ result: response });
  } catch (error) {
    console.error('Error in AI controller:', error);
    res.status(500).send('Internal Server Error');
  }
};
