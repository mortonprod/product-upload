import * as React from "react";
// import {String} from "./inputs/string";

/**
 * This will build the UI line by line.
 * It should allow you to add a new product.
 * It should show all components and allow you to update and delete them.
 */
export class InputBuilder extends React.Component<IPropsInputBuilder, IStatesInputBuilder> {
    public static defaultProps = {

    };
    private inputs: any = null;
    constructor(props: IPropsInputBuilder) {
        super(props);
        // this.inputs = createInputs(props.inputs);
    }
    public render() {
        return(
            <article>
                <h1>
                    {this.props.title}
                    Add a test parts.
                </h1>
                <form>
                {this.inputs}
                <input name="submit" title={"Click Me to submit"} onClick={this.submit}  alt={"Submit"}/>
                </form>
            </article>
        );
    }
    private submit(): any {
        return null;
    }
}

function onChange(currentValue: any, id: number): any {
    return null;
}

function createInputs(inputs: IInput[]) {
    const output = inputs.map((el, i) => {
        if (el.type === "string") {
        // return (<String key={i} id={i} {...el.props} onChange={onChange} />);
        }
    });
    return (
        <section>
            {output}
        </section>
    );
}
/**
 * This will render a list of products
 * If you click a product the cb will be called with the product information passed.
 * This callback allows you to then update the product in another component.
 */
function ListBuilder(products: any, cb: any) {
    return(
        <div />
    );
}
