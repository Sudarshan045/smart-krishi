import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ 
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (user) {
          // Update googleId if not present
          if (!user.googleId) {
            user.googleId = profile.id;
            user.avatar = profile.photos[0].value;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user if not exists
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          preferred_language: 'en',
          role: 'user',
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
