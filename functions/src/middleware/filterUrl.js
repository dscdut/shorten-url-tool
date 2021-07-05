/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
async function filterBody(req, res, next) {
  const {url} = req.body;

  if (!url) {
    return res.status(400).json({
      error: 'Url is required',
    });
  }

  console.log(isUrl(url));

  if (!isUrl(url)) {
    return res.status(400).json({
      error: 'Url is invalid',
    });
  }

  return next();
}

function isUrl(str) {
  const pattern =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  return pattern.test(str);
}

module.exports = filterBody;
