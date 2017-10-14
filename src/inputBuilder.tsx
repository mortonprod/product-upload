import * as React from "react";
import {String} from "./inputs/string";

/**
 * This will build the UI line by line.
 * The input is the type and then the props to create that type.
 */
export class InputBuilder extends React.Component<IPropsInputBuilder, IStatesInputBuilder> {
    public static defaultProps = {

    };
    private inputs: any = null;
    constructor(props: IPropsInputBuilder) {
        super(props);
        this.inputs = createInputs(props.inputs);
    }
    public render() {
        return(
            <article>
                <h1>
                    {this.props.title}
                </h1>
                <form>
                {this.inputs}
                <input name="submit" title={"Click Me to submit"} onClick={this.submit}  alt={"Submit"}>
                    Submit
                </input>
                </form>
            </article>
        );
    }
    private submit() {
        
    }
}

function onChange(currentValue: any, id: number) {

}

function createInputs(inputs: IInput[]) {
    const output = inputs.map((el, i) => {
        if (el.type === "string") {
        return (<String key={i} id={i} {...el.props} onChange={onChange} />);
        }
    });
    return (
        <section>
            {output}
        </section>
    );
}
