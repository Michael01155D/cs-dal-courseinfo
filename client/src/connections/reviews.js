//make .env file in client w BACKEND_URL

const url = `${import.meta.env.VITE_BACKEND_URL}/reviews`;

export const createReview = async ({review, token}) => {
    //todo: once login is implemented, verify session token matches review's author
    try {
        let reviewToPost = review;
        //verify data before posting:

        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
                //todo: add Authorization header
            },
            body: JSON.stringify({reviewToPost})
        })
        console.log("response from POST review is, ", response);
        return response;
    } catch (err) {
        console.log("err is: ", err);
    }
    
}

export const updateReview = async (review) => {

}

export const deleteReview = async (review) => {
    
}
