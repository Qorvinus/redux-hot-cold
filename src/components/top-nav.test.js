import React from 'react';
import { shallow } from 'enzyme';

import { TopNav } from './top-nav';
import { RESTART_GAME, restartGame, GENERATE_AURAL_UPDATE } from '../actions';

describe('<TopNav />', () => {
  it('Renders without crashing', () => {
    shallow(<TopNav />);
  });

  it('Should dispatch restartGame new game is clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TopNav dispatch={dispatch} />);
    const link = wrapper.find('.new');
    link.simulate('click', {
      preventDefault() {}
    });
    const action = restartGame();
    expect(dispatch).toHaveBeenCalled();
    expect(action.type).toEqual(RESTART_GAME);
  });

  it('Should dispatch generateAuralUpdate when new game is clicked', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TopNav dispatch={dispatch} />);
    const link = wrapper.find('.status-link');
    link.simulate('click', {
      preventDefault() {}
    });
    expect(dispatch).toHaveBeenCalled();
  });
});
