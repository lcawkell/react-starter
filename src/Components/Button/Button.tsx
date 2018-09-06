import * as React from 'react';
import Ripple from '../Ripple';

/**
 * @render react
 * @name Button
 * @description A really cool button
 * @example
 * <Button>Click Me!</Button>
 */

export interface IButtonStyles {
    root?: {

    },
    rootHovered?: {

    },
    rootActive?: {

    },
    rootPermActive?: {

    }
}

interface ButtonProps {
    onClick?: () => void,
    children?: any,
    styles?:IButtonStyles,
    active?: boolean,
    buttonRef?: any
}

interface ButtonState {
    hovering: boolean,
    active: boolean
}

export interface ActionButtonProps {
    children?:any,
    active?: boolean,
    onClick: () => void
}

export interface IconButtonProps {
    children?:any,
    active?: boolean,
    onClick: () => void
}

export class Button extends React.Component<ButtonProps, ButtonState> {
    public readonly state: ButtonState = {
        hovering: false,
        active: false
    }
    constructor(props: ButtonProps) {
        super(props);
    }


    onClick = (event) => {
        this.setState({active:false})
        this.props.onClick();
    }

    isHovering = (hovering: boolean) => {
        let active = this.state.active;
        if(!hovering) active = false;
        this.setState({hovering, active});
    }

    isActive = (active: boolean) => {
        this.setState({active});
    }

    renderChildren = () => {
        return React.Children.map(this.props.children,(child:any,index)=>{
            if(child.type === undefined) {
                // Text
                return <ButtonContent>{child}</ButtonContent>;
            } else {
                if(child.type.name === 'Icon') {
                    return React.cloneElement(child, {
                        styles: {
                            root: {
                                height: 17,
                                position:'relative' as 'relative',
                                top: '1px'
                            }
                        }
                    });
                }
            }
        });
    }

    render() {
        
        let defaultStyles:IButtonStyles = {
            root: {
                padding: '5px 10px',
                color: 'rgba(0,0,0,.6)',
                border: 'none',
                borderRadius: 2,
                background: '#F4F4F4',
                fontFamily: 'Arial',
                fontWeight: 700 as 700,
                position: 'relative' as 'relative',
                cursor: 'pointer',
                outline: 'none',
                margin: '5px 0px'
            },
            rootHovered: {
                background: '#EAEAEA'
            },
            rootActive: {
                background: '#C8C8C8'
            },
            rootPermActive: {
                background: '#002145',
                color: '#fff'
            }
        }

        let userStyles = this.props.styles !== undefined ? this.props.styles : {};

        //let styles:IButtonStyles = Object.assign({}, defaultStyles, userStyles);

        let styles:IButtonStyles = {
            root: Object.assign({},defaultStyles.root,userStyles.root),
            rootHovered: Object.assign({}, defaultStyles.rootHovered, userStyles.rootHovered),
            rootActive: Object.assign({}, defaultStyles.rootActive, userStyles.rootActive),
            rootPermActive: Object.assign({}, defaultStyles.rootPermActive, userStyles.rootPermActive)
        }

        let rootHovered = this.state.hovering ? styles.rootHovered : {};
        let rootActive = this.state.active ? styles.rootActive : {};
        let rootPermActive = this.props.active ? styles.rootPermActive : {};

        return (
            <button 
                type="button" 
                style={{...styles.root, ...rootHovered, ...rootActive, ...rootPermActive}} 
                onMouseEnter={()=>this.isHovering(true)} 
                onMouseLeave={()=>this.isHovering(false)}
                onMouseDown={()=>this.isActive(true)}
                onMouseUp={this.onClick}
                ref={this.props.buttonRef}
                >

                {this.props.children}
            </button>
        );
    }
}

export function ButtonContent(props) {
    let contentStyle = {
        root: {
            position:'relative' as 'relative', 
            top:'-2', 
            margin: '0px 5px 0px 5px',
            fontSize: '.8rem',
            fontWeight: 400 as 400,

        }
    }
    return (
        <span style={contentStyle.root}>{props.children}</span>
    );
}

export function ActionButton (props: ActionButtonProps) {

    const styles:IButtonStyles = {
        root: {
            background: 'transparent'
        },
        rootActive: {
            background: 'transparent',
            color: '#000'
        },
        rootHovered: {
            background: 'transparent',
            color: '#0078D4'
        }
    }

    return (
        <Button styles={styles} active={props.active} onClick={props.onClick}>{props.children}</Button>
    );
}


interface IconButtonState {
    position: {x:number, y:number},
    ripple: {left: number, top:number}[],
    children?:any
}

let iconButtonElement;
let iconButtonContainerElement;

export class IconButton extends React.Component<IconButtonProps, IconButtonState> {
    public readonly state:IconButtonState = {
        position: {
            x: 0,
            y: 0
        },
        ripple: []
    }
    constructor(props:IconButtonProps){
        super(props);
    }

    componentDidMount(){

        let iconButtonPosition = {y:0, x:0, height:0, width: 0};
        let iconButtonContainerPosition = {y:0, x:0, height:0, width:0};


        iconButtonPosition = iconButtonElement.getBoundingClientRect();
        iconButtonContainerPosition = iconButtonContainerElement.getBoundingClientRect();        


        //console.log(iconButtonPosition.x-iconButtonContainerPosition.x)

        this.setState({
            position: {
                x: (iconButtonPosition.x-iconButtonContainerPosition.x)+(iconButtonPosition.width/2)-1,
                y: (iconButtonPosition.y-iconButtonContainerPosition.y)+(iconButtonPosition.height/2)
            }
        });
    }

    onClick = () => {
        this.props.onClick();
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

    setButtonContainerRef = element => {
        iconButtonContainerElement = element;
    };

    render(){

        const styles:IButtonStyles = {
            root: {
                background: 'transparent',
                fill: '#555',
                minWidth: 'auto' as 'auto'
            },
            rootActive: {
                background: 'transparent',
                fill: '#555'
            },
            rootHovered: {
                background: 'transparent',
                fill: '#0078D4'
            }
        }

        let Ripples = this.state.ripple.map((ripple)=>{
            return <Ripple top={ripple.top} left={ripple.left} size="small" onComplete={()=>{}} color="#aaa"/>
        });

        return (
            <span style={{position: 'relative'}} ref={this.setButtonContainerRef}>
                <Button styles={styles} active={this.props.active} onClick={this.onClick} buttonRef={el => iconButtonElement = el}>{this.props.children}</Button>
                {Ripples}
            </span>
        );
    }

}