import * as React from 'react';
import * as css from './Icon.css';
import { Icons } from './Icon.fn';

/**
 * @render react
 * @name Icon
 * @description Easy to use SVG Icons
 * @example
 * <Icon icon="sync-regular"></Icon>
 */

export enum IconTypes {
    plusLight = 'plus-light',
    plus = 'plus',
    plusSolid = 'plus-solid',
    spinner = 'spinner',
    cog = 'cog',
    editLight = 'edit-light',
    pencilLight = 'pencil-light',
    pencil = 'pencil',
    pencilSolid = 'pencil-solid',
    syncLight = 'sync-light',
    sync = 'sync',
    syncSolid = 'sync-solid',
    checkLight = 'check-light',
    check = 'check'
}



export interface IIconStyles {
    root?: {

    }
}

export interface IconProps {
    icon: string|{svgCode:string, viewBox:string},
    rotate?: boolean,
    styles?: IIconStyles,
    color?: string,
    size?: 'small' | 'medium' | 'large',
    iconRef?: any
}

export interface IconState {
}


export default class Icon extends React.Component<IconProps, IconState> {
    constructor(props: IconProps) {
        super(props);
    }

    render() {
        let { icon, color, size } = this.props;
        let height = 30;
        
        switch(size){
            case 'small':
                height = 16;
                break;
            case 'medium':
                height = 22;
                break;
            case 'large':
                height = 28;
                break;
        }

        let defaultStyles:IIconStyles = {
            root: {
                height:height,
                width:'auto',
                strokeWidth: 3,
                fill: '#000',
                position: 'relative' as 'relative',
                top: '1px'
            }
        }

        let oSvg = (typeof icon === 'string') ? Icons[icon] : icon;

        let styles:any = Object.assign({}, defaultStyles, this.props.styles);

        color!=undefined?styles.root.fill = color : null;

        let rotate = this.props.rotate ? css.rotate : '';
        return (
            <svg className={rotate} style={styles.root} xmlns="http://www.w3.org/2000/svg" viewBox={oSvg.viewBox} ref={this.props.iconRef}>
                <path d={oSvg.svgCode}/>
            </svg>
        );
    }
}
