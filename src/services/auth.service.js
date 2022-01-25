const AuthService = {
  
  login: (username, password) => {
    const data = { username, password }

    return fetch('auth/login', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if(!response.ok){
          throw Error("Login failed!")
        }
        return response.json()
      })
      .then((response) => {
        return response.token;
      });
  },

}

export default AuthService;