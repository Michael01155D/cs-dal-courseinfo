//make .env file in client w BACKEND_URL

const url = `${import.meta.env.VITE_BACKEND_URL}/reviews`;

export const createReview = async (review, token) => {
    //todo: once login is implemented, verify session token matches review's author
    try {
   
        console.log("in frontend connection, review to post is: " , review)
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
                //todo: add Authorization header
            },
            body: JSON.stringify(review)
        })
        
        return response.json();
    } catch (err) {
        console.log("err is: ", err);
    }
    
}

export const updateReview = async (review) => {
    try {
        const response = await fetch(`${url}/${review._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
                //todo: add auth header
            },
            body: JSON.stringify(review)
        })

        const data = await response.json();
        console.log('in updatereview data is ', data)
        return data;
    } catch (err) {
        console.log("Error in updateReview connection is",)
    }
}

export const deleteReview = async (id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
                //todo: add auth header
            }
        })

    } catch (err) {

    }
}
