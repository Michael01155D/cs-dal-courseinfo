//make .env file in client w BACKEND_URL
const url = `${import.meta.env.VITE_BACKEND_URL}/users`;

export const login = async (user) => {
    console.log("in frontend login service, user being passed as param is", user)
    try {
        const res = await fetch(`${url}/login`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
              }
        })
    const result = await res.json();
    if (!result.error) {
        localStorage.setItem('csDal', JSON.stringify(result));
    }
    return result;
    } catch (exception) {
        console.log("exception in login connection: ", exception)
    }

}

export const logout = async (user) => {

    localStorage.removeItem('csDal');
}

export const register = async (userInfo) => {
    try {
        const res = await fetch(url, {
            method: 'post',
            body: {username: userInfo.username, password: userInfo.password},
            headers: {
                "Content-Type": "application/json",
              }
        })
        return res.json();  
    } catch (exception) {
        console.log('its an exception that says: ', exception);      
        }

}

export const deleteUser = async (user) => {

}

export const updateUser = async (user) => {
    
}