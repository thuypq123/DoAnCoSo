getCookie = (cookie, name) => {
    const q = {}
    cookie?.replace(/\s/g, '')
      .split(';')
      .map(i=>i.split('='))
      .forEach(([key, value]) => {
        q[key] = value
      })
    return q[name]??null;
}
module.exports = getCookie;