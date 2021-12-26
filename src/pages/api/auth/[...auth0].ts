import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        getLoginState(req) {
          return {
            returnTo: req.headers.referer,
          }
        },
      })
    } catch (err: any) {
      res.status(err.status ?? 500).end(err.message)
    }
  },
})
