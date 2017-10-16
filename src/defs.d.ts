interface IOptionsDatabase {
    connectString: string;
    collectionName: string;
    successMessage: string;
    inputFile: string;
    logLevel: number;
}

interface IReturnDatabase {cr: any; de: any; up: any; re: any, co: any} 

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
    title?: string;
    inputs?: any
}

interface IStatesInputBuilder{
}