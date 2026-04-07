// Mock JWT auth middleware - in production would verify real JWT tokens
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' })
  }
  const token = authHeader.slice(7)
  // Accept any non-empty token in mock mode
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  req.user = { id: 'mock-user', role: 'admin' }
  next()
}
