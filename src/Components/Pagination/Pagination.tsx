import * as React from 'react';

import { Button } from '../Button';
import Icon from '../Icon';
import { IconButton } from '../Button';

let nextIcon = {
    svgCode: 'M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z',
    viewBox: '0 0 256 512'
}

let previousIcon = {
    svgCode: 'M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z',
    viewBox: '0 0 256 512'
}

export interface PaginationProps {
    total:number,
    perPage: number,
    currentPage?: number,
    onPaginate?: (newPage:number) => void
}

export interface PaginationState {
    currentPage: number
}

export default class Pagination extends React.Component<PaginationProps, PaginationState> {
    public readonly state: PaginationState = {
        currentPage: 0
    }
    constructor(props: PaginationProps) {
        super(props);
    }

    Paginate = (pageNumber) => {
        this.props.onPaginate(pageNumber);
    }

    nextPage = () => {
        if(this.props.currentPage < Math.ceil(this.props.total/this.props.perPage))
        this.Paginate(this.props.currentPage+1);
    }

    previousPage = () => {
        if(this.props.currentPage > 1)
        this.Paginate(this.props.currentPage-1);
    }

    render() {
        let { total, perPage, onPaginate, currentPage } = this.props;

        let page = currentPage !== undefined ? currentPage : this.state.currentPage;

        let numberOfPages = Math.ceil(total/perPage);

        let styles = {
            root: {
                position: 'relative' as 'relative',
                minHeight: '30px',
                userSelect: 'none' as 'none'
            },
            info: {
                position: 'absolute' as 'absolute',
                top: '7px',
                right: '60px',
                fontSize: '14px'
            },
            icon: {
                position: 'absolute' as 'absolute'
            },
            previousPage: {
                right: '28px',
                top: '-5px',
                cursor: 'pointer'
            },
            nextPage: {
                right: '3px',
                top: '-5px',
                cursor: 'pointer'
            }
        }

        let groupMax = (page*perPage);
        let groupMaxMod = groupMax > total ? total : groupMax;

        return (
            <div style={{...styles.root}}>
                <span style={{...styles.info}}>{(groupMax-perPage)+1}-{groupMaxMod} of {total}</span>
                <span style={{...styles.icon,...styles.previousPage}}><IconButton onClick={this.previousPage}><Icon icon={previousIcon} size="small" /></IconButton></span>    
                <span style={{...styles.icon,...styles.nextPage}} ><IconButton onClick={this.nextPage}><Icon icon={nextIcon} size="small" /></IconButton></span>
            </div>
        );
    }
}
