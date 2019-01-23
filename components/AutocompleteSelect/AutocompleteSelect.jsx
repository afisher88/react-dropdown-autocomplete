import React, { PureComponent } from 'react';
import Downshift from 'downshift';
import classnames from 'classnames';
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
    } else {
      this.setState({ items: [] });
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
              Search Fruit
            </label>
            <div className={`${CSSname}__inner-wrapper`}>
              <input
                className={`${CSSname}__input`}
                {...getInputProps()}
                placeholder="Please type a fruit name..."
              />
              <LoadingSpinner spinning={loading} />
              {isOpen ? (
                <ul className={`${CSSname}__dropdown`} {...getMenuProps()}>
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
                            item
                            // style: {
                            //   backgroundColor:
                            //     highlightedIndex === index
                            //       ? 'lightgray'
                            //       : 'white',
                            //   fontWeight:
                            //     selectedItem === item ? 'bold' : 'normal'
                            // }
                          })}
                          className={classnames({
                            [`${CSSname}__item`]: true,
                            [`${CSSname}__item--selected`]: selectedItem,
                            [`${CSSname}__item--highlighed`]: highlightedIndex
                          })}
                        >
                          {item.value}
                        </li>
                      ))}
                </ul>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}
