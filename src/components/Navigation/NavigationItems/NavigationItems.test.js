import React from 'react';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavItem from './NavItem/Navitem';

configure({adapter: new Adapter()}); // connecting enzyme with our react app. Enzyme helps us to run standalone component without rendering whole react app.

// method(global) by jest
describe('<NavigationItems />',()=>{  // first argument for the tag i.e for which item you want to write a test.
    let wrapper;
    beforeEach(()=>{ // excecutes before each tests.
        wrapper = shallow(<NavigationItems/>);
    })

    it('should render two navItems if not authenticated',()=>{ // description of a test
        // const wrapper = shallow(<NavigationItems/>); // method through which we can render our component. this do not deeply render everything.
        expect(wrapper.find(NavItem)).toHaveLength(2); // finds the passed component ,is it there or not and we chain any of helper methods by jest. 
    }); 

    it('should render three navItems if authenticated',()=>{ // description of a test
        // const wrapper = shallow(<NavigationItems isAuthenticated />); 
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should render exactly the navItems: logout with link="/logout" ',()=>{ // description of a test
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavItem link="/logout"> Logout </NavItem>)).toEqual(true); // finds for  exact match (strictly saying).
    });

}) 

