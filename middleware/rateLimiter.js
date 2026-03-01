// Simple in-memory rate limiter for AI chat endpoint
const requestLog = new Map();

export const aiRateLimiter = (req, res, next) => {
    const userId = req.user?.id || req.ip; // Use user ID if authenticated, otherwise IP
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 5; // Max 5 requests per minute

    if (!requestLog.has(userId)) {
        requestLog.set(userId, []);
    }

    const userRequests = requestLog.get(userId);
    
    // Remove requests older than the window
    const recentRequests = userRequests.filter(time => now - time < windowMs);
    requestLog.set(userId, recentRequests);

    if (recentRequests.length >= maxRequests) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please wait a moment before sending another message."
        });
    }

    // Add current request timestamp
    recentRequests.push(now);
    next();
};

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
    const now = Date.now();
    const windowMs = 60 * 1000;
    
    for (const [userId, requests] of requestLog.entries()) {
        const recentRequests = requests.filter(time => now - time < windowMs);
        if (recentRequests.length === 0) {
            requestLog.delete(userId);
        } else {
            requestLog.set(userId, recentRequests);
        }
    }
}, 5 * 60 * 1000);
