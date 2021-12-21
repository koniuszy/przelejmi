import { GetServerSideProps } from 'next'

export default () => null

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [, query] = ctx.resolvedUrl.split('?')

  const params = new URLSearchParams(query)

  const state = params.get('state') || ''
  const encodedState = Buffer.from(state, 'base64').toString('ascii')

  const code = params.get('code') || ''
  const encodedCode = Buffer.from(code, 'base64').toString('ascii')

  console.log(params, encodedState, encodedCode, ctx.req.cookies)

  return { redirect: { permanent: true, destination: '/' } }
}
