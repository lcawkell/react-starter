import * as React from 'react';
import Icon from '../Icon';
import Ripple from '../Ripple';

let uncheckedIcon = {
    svgCode: 'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z',
    viewBox: '0 0 448 512'
}

let checkedIcon = {
    svgCode: 'M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 32c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352m-34.301 98.293l-8.451-8.52c-4.667-4.705-12.265-4.736-16.97-.068l-163.441 162.13-68.976-69.533c-4.667-4.705-12.265-4.736-16.97-.068l-8.52 8.451c-4.705 4.667-4.736 12.265-.068 16.97l85.878 86.572c4.667 4.705 12.265 4.736 16.97.068l180.48-179.032c4.704-4.667 4.735-12.265.068-16.97z',
    viewBox: '0 0 448 512'
}

export interface CheckboxProps {
    checked?: boolean,
    onChange?: (checked:boolean) => void,
    inverse?: boolean,
    size?: 'small' | 'medium' | 'large',
    disabled?: boolean
}

export interface CheckboxState {
    checked: boolean,
    position: {x:number, y:number},
    ripple: {left: number, top:number}[]
}

let checkboxElement;
let checkboxContainerElement;

export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    public readonly state:CheckboxState = {
        checked: false,
        position: {
            x: 0,
            y: 0
        },
        ripple: []
    }
    constructor(props: CheckboxProps) {
        super(props);
    }

    componentDidMount(){

        let checkboxPosition = {y:0, x:0, height:0, width: 0};
        let checkboxContainerPosition = {y:0, x:0, height:0, width:0};


        checkboxPosition = checkboxElement.getBoundingClientRect();
        checkboxContainerPosition = checkboxContainerElement.getBoundingClientRect();        


        //console.log(checkboxPosition.x-checkboxContainerPosition.x)

        this.setState({
            position: {
                x: (checkboxPosition.x-checkboxContainerPosition.x)+(checkboxPosition.width/2)-1,
                y: (checkboxPosition.y-checkboxContainerPosition.y)+(checkboxPosition.height/2)
            }
        });
    }

    setCheckboxContainerRef = element => {
        checkboxContainerElement = element;
    };

    onClick = (event)=>{
        let checked = this.props.checked !== undefined ? this.props.checked : this.state.checked;
        this.setState({checked:!checked});
        this.props.onChange !== undefined? this.props.onChange(!checked) : null;

        // console.log(event.nativeEvent);
        // console.log(this.state.position);
        this.doRipple(event);
    }

    doRipple = (event) => {
        this.setState({
            ripple: []
        }, ()=>{
            this.setState({
                ripple: [
                    {
                        left: this.state.position.x,
                        top: this.state.position.y
                    }
                ]
            })
        });
    }

    onRippleComplete = () => {

    }

    render() {

        let { checked, inverse, size } = this.props;

        let iconSize = this.props.size !== undefined ? this.props.size : 'medium';

        let isChecked = this.props.checked !== undefined ? this.props.checked : this.state.checked;

        let iconType = isChecked? checkedIcon : uncheckedIcon;

        let color = inverse ? '#fff' : '#000';
        let rippleColor = inverse ? '#fff' : '#2196f3';

        let styles = {
            root: {
                padding: '10px',
                cursor: 'pointer',
                userSelect: 'none' as 'none',
                position: 'relative' as 'relative'
            }
        }

        let Ripples = this.state.ripple.map((ripple)=>{
            return <Ripple top={ripple.top} left={ripple.left} size="small" onComplete={this.onRippleComplete} color={rippleColor}/>
        });

        return (
            <span style={{...styles.root}} onClick={this.onClick} ref={this.setCheckboxContainerRef} >
                <Icon icon={iconType} iconRef={el => checkboxElement = el} color={color} size={iconSize} />
                {Ripples}
            </span>
        );
    }
}
