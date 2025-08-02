const axios = require('axios');

exports.recommend = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324:free', // Use free DeepSeek V3 0324 model
        messages: [
          { role: 'system', content: 'You are a helpful movie recommendation assistant.' },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenRouter error:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to get recommendation.' });
  }
};
 