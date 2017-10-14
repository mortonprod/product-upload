import * as React from "react";

/**
 * This will take in a create a single string input object.
 * It will be initialised with props and a callback function will pass a change in the input.
 * It does nothing but pass a current record of the input up to the parent component.
 */
export class String extends React.Component<IPropsString> {
    public static defaultProps = {
        defaultName: "",
        name: "default name",
    };
    private input: HTMLInputElement = null;
    constructor() {
        super();
    }
    public render() {
        return(
            <div>
                <label htmlFor="string">{this.props.name}</label>
                <input ref={(input) => this.input = input} onChange={this.onChange} type="text" defaultValue={this.props.defaultName} className={""} id="string" placeholder={this.props.placeHolder} required data-validation-required-message="Need an entry here" title={this.props.name + "goes here."}/>
            </div>
        );
    }
    private onChange() {
        const currentValue = this.input.value;
        this.props.onChange(currentValue, this.props.id);
    }
}
