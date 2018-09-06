import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface IAppProps {
}

export interface IAppState {

}

export default class App extends React.Component<IAppProps, IAppState> {

    public readonly state:IAppState = {

    }

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                Test!
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);