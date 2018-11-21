const emailRegexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const isEmail = (str) => emailRegexp.test(str);

export const subscribe = (url, publicKey) => (fetch(`${url}/subscribers`, {
  method: 'POST',
  headers: {
    authorization: `Basic ${publicKey}`
  }
}));

export const unsubscribe = (url, publicKey) => (fetch(`${url}/subscribers`, {
  method: 'DELETE',
  headers: {
    authorization: `Basic ${publicKey}`
  }
}));

export const getInfos = (url, publicKey) => (fetch(`${url}/infos`, {
  method: 'GET',
  headers: {
    authorization: `Basic ${publicKey}`
  }
}));
