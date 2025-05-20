exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'admin123') {
    res.json({ role: 'admin' });
  } else if (email === 'user@example.com' && password === 'user123') {
    res.json({ role: 'user' });
  } else {
    res.status(401).json({ message: 'Email atau password salah' });
  }
};
