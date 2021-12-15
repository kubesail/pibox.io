export default async function handler(req, res) {
  const headers = { authorization: req.headers.authorization }
  let body = req.body

  if (req.headers['x-bz-file-name']) {
    headers['x-bz-file-name'] = req.headers['x-bz-file-name']
    headers['x-bz-content-sha1'] = req.headers['x-bz-content-sha1']
    headers['content-type'] = req.headers['content-type']
    headers['content-length'] = req.headers['content-length']
    // console.log(body)
    body = Buffer.from(body, 'base64')
    // console.log(body)
  }

  const b2res = await fetch(req.query.url, {
    headers,
    method: req.method,
    body: req.method === 'POST' ? body : undefined,
  })
  res.status(200).json(await b2res.json())
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}
