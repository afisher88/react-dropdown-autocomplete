import React, { PureComponent } from 'react';
import Downshift from 'downshift';
import { debounce } from 'lodash-es';
import { mockDataHandlerSuccess, mockDataHandlerFail } from '../mockResponse';
import './AutocompleteSelect.scss';

export default class AutocompleteSelect extends PureComponent {
  constructor() {
    super();

    this.handleInputValueChange = debounce(this.handleInputValueChange, 1000);
  }

  handleInputValueChange = (value, stateAndHelpers) => {
    console.log('running!');
    mockDataHandlerSuccess(value).then(response => console.log(response));
  };

  render() {
    return (
      <Downshift
        onChange={selection => alert(`You selected ${selection.value}`)}
        onInputValueChange={(value, stateAndHelpers) =>
          this.handleInputValueChange(value, stateAndHelpers)
        }
        itemToString={item => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? typeof items === 'object' &&
                  items
                    .filter(
                      item => !inputValue || item.value.includes(inputValue)
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? 'lightgray'
                                : 'white',
                            fontWeight:
                              selectedItem === item ? 'bold' : 'normal'
                          }
                        })}
                      >
                        {item.value}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }
}
