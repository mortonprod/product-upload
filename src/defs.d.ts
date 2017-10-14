interface IOptionsDatabase {
    connectString: string;
    collectionName: string;
    successMessage: string;
}

interface IReturnDatabase {cr: any; de: any; up: any; re: any, getAll: any} 

interface IOptions {
    url: string;
    db: IReturnDatabase;
    unpkgUI: string;
}

interface IPropsString {
    name: string;
    defaultName: string;
    placeHolder: string;
    id: string;
    onChange: any;
}

interface IPropsCombination extends IPropsString {

}

interface IInput {
    type: string;
    props: IPropsCombination;
}

interface IPropsInputBuilder{
    title: string;
    inputs: Array<IInput>
}

interface IStatesInputBuilder{
}