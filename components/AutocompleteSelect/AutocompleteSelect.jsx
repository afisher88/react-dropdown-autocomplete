import React, { PureComponent } from 'react';
import Downshift from 'downshift';
import { debounce } from 'lodash-es';
import {
  mockDataHandlerSuccess,
  mockDataHandlerFail
} from '../../mockResponse';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './AutocompleteSelect.scss';

const CSSname = 'autocomplete-select';

export default class AutocompleteSelect extends PureComponent {
  constructor() {
    super();

    this.state = {
      items: [],
      loading: false
    };

    this.handleInputValueChange = debounce(this.handleInputValueChange, 1000);
  }

  handleInputValueChange = (value, stateAndHelpers) => {
    if (value.length > 1) {
      this.setState({ loading: true });
      mockDataHandlerSuccess(value).then(response =>
        this.setState({ items: response, loading: false })
      );
    }
  };

  render() {
    const { items, loading } = this.state;

    console.log(items);

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
          <div className={`${CSSname}`}>
            <label className={`${CSSname}__label`} {...getLabelProps()}>
              Enter a fruit
            </label>
            <div className={`${CSSname}__input-wrapper`}>
              <input className={`${CSSname}__input`} {...getInputProps()} />
              <LoadingSpinner spinning={loading} />
            </div>
            {isOpen ? (
              <ul {...getMenuProps()}>
                {items.length > 0 &&
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
                    ))}
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}
