import axios from "axios";
import * as React from "react";
import {productsService} from "./productsService";
/**
 * This part links a single product to the backend.
 * It will take in a product and the REST API method we are trying to perform.
 * It will then construct the UI using the json product information.
 * it does this by looking through the json which has a name;value;type.
 * Once submit is called it will contact the backend and wait for a success or failure method.
 */
export class Product extends React.Component<{product: any; url: string}, {messages: string[]}> {
    private currentProduct: any = null;
    private formData: any = null;
    constructor() {
        super();

    }
    public render() {
        return (
            <div />
        );
    }
    private submit() {
        productsService.post(this.props.url, this.formData, { "content-type": "multipart/form-data" })
        .then((messages: string[]) => {
            this.setState({messages});
            console.log("Success messages: " + JSON.stringify(messages));
        }).catch((messages) => {
            this.setState({messages});
            console.log("Failure messages: " + JSON.stringify(messages));
        });
    }
}
