import React from 'react';
import { mount } from 'enzyme';
import Confirm from './Confirm.jsx';

describe('Confirm', () => {
  const onRemove = jest.fn();
  const onCancel = jest.fn();
  const output = mount(<Confirm onRemove={onRemove} onCancel={onCancel} />);

  it('renders correctly Confirm', () => {
    const span = output.find('span');
    expect(span.text()).toBe('Are you sure?');

    const remove = output.find('.remove');
    expect(remove.text()).toBe('Remove');

    const cancel = output.find('.cancel');
    expect(cancel.text()).toBe('Cancel');
  });

  it('simulate click buttons', () => {
    const remove = output.find('.remove');
    remove.simulate('click');
    expect(onRemove).toHaveBeenCalled();

    const cancel = output.find('.cancel');
    cancel.simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });
});
