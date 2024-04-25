const Session = require('../models/session');

exports.createSession = async (req, res) => {
  try {
    const { user_id, query, file_used, result } = req.body;
    const session = new Session({ user_id, query, file_used, result });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSessionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ user_id: userId });
    res.json(sessions);
  } catch (error) {
    console.error('Error getting sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllSessions = async (req, res) => {
  let sessions;
  try {
    sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    console.error('Error getting sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
