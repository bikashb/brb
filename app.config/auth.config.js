var auth = {

         fbAuth: {
                  clientID: process.env.FB_CLIENT_ID || '119488238695283',  //app id
                  clientSecret: process.env.FB_CLIENT_SECRET || '21c312124625c735b211a5a9b5322286', // app secret
                  callbackURL: process.env.FB_CALLBACK_URL || 'http://localhost:3000/api/v1/signin/auth/facebook/callback'
               },

         gAuth: {

                  clientID: process.env.GOOGLE_CLIENT_ID || '62200292778-pollbs519rc8mmspmpqqq1djm9j8kqe0.apps.googleusercontent.com',  //app id
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DRqmAxbOjMGyeyyoSpCvgYGu', // app secret
                  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/v1/signin/auth/google/callback'
             }
}

module.exports = auth;
