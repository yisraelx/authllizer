module.exports = {
    // App Settings
    port: process.env.NODE_PORT || 3000,
    host: process.env.NODE_HOST || '0.0.0.0',
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost/authllizer',
    tokenSecret: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

    // OAuth 2.0
    bitbucketClientSecret: process.env.BITBUCKET_SECRET || 'YOUR_BITBUCKET_CLIENT_SECRET',
    facebookClientSecret: process.env.FACEBOOK_SECRET || 'YOUR_FACEBOOK_CLIENT_SECRET',
    githubClientSecret: process.env.GITHUB_SECRET || 'YOUR_GITHUB_CLIENT_SECRET',
    googleClientSecret: process.env.GOOGLE_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    instagramClientSecret: process.env.INSTAGRAM_SECRET || 'YOUR_INSTAGRAM_CLIENT_SECRET',
    linkedinClientSecret: process.env.LINKEDIN_SECRET || 'YOUR_LINKEDIN_CLIENT_SECRET',
    liveClientSecret: process.env.LIVE_SECRET || 'YOUR_LIVE_CLIENT_SECRET',
    redditClientSecret: process.env.REDDIT_SECRET || 'YOUR_REDDIT_CLIENT_SECRET',
    spotifyClientSecret: process.env.SPOTIFY_SECRET || 'YOUR_SPOTIFY_CLIENT_SECRET',
    twitchClientSecret: process.env.TWITCH_SECRET || 'YOUR_TWITCH_CLIENT_SECRET',
    vkClientSecret: process.env.VK_SECRET || 'YOUR_VK_CLIENT_SECRET',
    wordpressClientSecret: process.env.WORDPRESS_SECRET || 'YOUR_WORDPRESS_CLIENT_SECRET',
    yahooClientSecret: process.env.YAHOO_SECRET || 'YOUR_YAHOO_CLIENT_SECRET',

    // OAuth 1.0
    twitterClientKey: process.env.TWITTER_KEY || 'YOUR_TWITTER_CLIENT_KEY',
    twitterClientSecret: process.env.TWITTER_SECRET || 'YOUR_TWITTER_CLIENT_SECRET',
};
