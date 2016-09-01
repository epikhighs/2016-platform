// import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Email from 'main/component/email.jsx';

describe('<Foo />', () => {
    it('calls componentDidMount', () => {
        const wrapper = shallow(<Email/>);
        expect(wrapper.find('input')).to.have.length(1);
    });
});