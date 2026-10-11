const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Converts any error into a friendly JSON message (no raw stack traces)
const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID or value';
  } else if (err.code === 11000) {
    status = 409;
    message = 'That value already exists';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Session expired. Please log in again';
  }

  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? 'Server error. Please try again.' : message });
};

module.exports = { notFound, errorHandler };
