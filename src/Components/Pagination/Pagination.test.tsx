import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Pagination from './Pagination';

import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new EnzymeAdapter()})

let control:ShallowWrapper<undefined, undefined>;
beforeEach(()=>{
    control = shallow(<Pagination total={100} perPage={10} />);
});

describe('Pagination', ()=>{
    it("Renders a container div", ()=>{
        expect(control.find("div").length).toBe(1);
    });
});