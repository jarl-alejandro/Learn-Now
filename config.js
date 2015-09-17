'use strict'

export default {
    TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '8d46f4c8244a2af08ecad595f0464df1',
    TWITTER_KEY: process.env.TWITTER_KEY || '4AjPke75ud5Ak94J4nsNlfAZB',
    TWITTER_SECRET: process.env.TWITTER_SECRET || 'kCcY0t65PutMkv4ZWHguLOLp29THYhsEJo1GSmHtxHXTgFDwda',
    TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || '/auth/twitter/callback',
}
