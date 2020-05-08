import fetch from 'isomorphic-fetch';
const util = {
  _apiHost: 'localhost',

  fetch(path, options:any = {}) {
    const headers = options.headers || {};
    const apiHost = this._apiHost;
    let contentTypeHeader = {};
    let data = null;
    if (options.data) {
      data = JSON.stringify(options.data);
      delete options.data;
      contentTypeHeader['Content-Type'] = 'application/json';
    } else if (options.formData) {
      data = options.formData;
      delete options.formData;
    }

    let host = apiHost;

    return fetch(`http://${host}:3007/${path}`, {
      method: 'GET',
      credentials: 'include',
      body: data,
      ...options,
      headers: {
        ...contentTypeHeader,
        ...headers
      },
    }).then(async function(response) {
        if (response.status >= 400) {
          let errorMessage = response.statusText;
          try {
            const error = await response.json();
            errorMessage = error.message;
          } catch (e) {
          }
          return Promise.reject({message: errorMessage})
        } else {
          return response.json();
        }
      });
  },

  config(host) {
    this._apiHost = host;
  },

  refresh() {
    window.location.reload();
  }
}

export default util;