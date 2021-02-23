import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login() {
        // Get a token
        var addr=localStorage.getItem('address');

        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                addr
             })
            
        }).then(res => {
            this.setToken(res.token)
            window.location.reload();

            return Promise.resolve(res);
            
        })
    }

    loggedIn=() =>{
        var token=localStorage.getItem('id_token')
        return this.fetch(`${this.domain}/loggedin`, {
            method: 'POST',
            body: JSON.stringify({
                token
             })
            }).then(res => {
                console.log(res)
              return Promise.resolve(res.result);
        })
    }


    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else 
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        window.location.reload();
    }

    getProfile() {
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
                         }

        // if (this.loggedIn()) {
        //     headers['Authorization'] = 'Bearer ' + this.getToken()
        // }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}