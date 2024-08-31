//make .env file in client w BACKEND_URL
const url = `${import.meta.env.VITE_BACKEND_URL}/users`;

export const login = async (user) => {
    
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
    try {
        const res = await fetch(`${url}/logout/${user._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: user._id})
        })
        localStorage.removeItem('csDal');
    } catch (e) {
        console.log("exception in logout service: ", e);
    }
}

export const register = async ({username, password}) => {

    try {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify({username, password}),
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

//after posting or updating a review, call to update logged in user
export const updateUserLocally = async (user, setUser) => {
    try {
        const result = await fetch(`${url}/${user._id}`)
        if (!result.error) {
            const data = await result.json();
            localStorage.setItem('csDal', JSON.stringify(data));
            setUser(data);
        }
    } catch (err) {
        console.log("updateUserLocally err is", err);
    }
}