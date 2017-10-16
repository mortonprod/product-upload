import axios from "axios";
const productsService = (() => {
    /**
     * This utility module will take a url formdata and content type and send this to the server.
     * It will decide which type of post to perform depending on if we have added a binary file.
     * It will resolve when we have a response from the server with success or failure.
     * @param api The API to connect to.
     * @param form Form data.
     * @param content Specify that form data is binary.
     */
    function post(api: string, form: FormData, content: any) {
        return new Promise((resolve, reject) => {
            if (content) {
                axios.post(api, form, content).then((res) => {
                    resolve(res.data);
                    console.log("Message from post: " + JSON.stringify(res.data));
                }).catch((err) => {
                    console.log("Error Message: " + JSON.stringify(err));
                    reject(err);
                });
            }else {
                axios.post(api, form).then((res) => {
                    resolve(res.data);
                    console.log("Message from post: " + JSON.stringify(res.data));
                }).catch((err) => {
                    console.log("Error Message: " + JSON.stringify(err));
                    reject(err);
                });
            }
        });
    }
    return {
        post,
    };
})();

export {productsService};
