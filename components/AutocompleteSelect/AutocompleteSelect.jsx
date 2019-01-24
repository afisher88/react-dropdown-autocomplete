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
    if (stateAndHelpers.isOpen && value.length > 1) {
      this.setState({ loading: true });
      mockDataHandlerSuccess(value).then(response => {
        console.log(response);
        this.setState({ items: response, loading: false });
      });
    } else {
      this.setState({ items: [] });
    }
  };

  handleSubmit = selectedItem => {
    console.log(selectedItem);
  };

  render() {
    const { items, loading } = this.state;

    return (
      <Downshift
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
          highlightedIndex,
          selectedItem
        }) => (
          <div
            className={classnames({
              [`${CSSname}`]: true,
              [`${CSSname}--open`]: isOpen
            })}
          >
            <label className={`${CSSname}__label`} {...getLabelProps()}>
              Search Fruit
            </label>
            <div className={`${CSSname}__inner-wrapper`}>
              <div className={`${CSSname}__input-wrapper`}>
                <input
                  className={`${CSSname}__input`}
                  {...getInputProps()}
                  placeholder="Please type a fruit name..."
                />
                <button
                  type="button"
                  onClick={() => this.handleSubmit(selectedItem)}
                  disabled={!selectedItem}
                >
                  Submit
                </button>
              </div>
              {isOpen ? (
                <ul className={`${CSSname}__dropdown`} {...getMenuProps()}>
                  {items.length > 0
                    ? items.map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item
                          })}
                          className={classnames({
                            [`${CSSname}__item`]: true,
                            [`${CSSname}__item--selected`]:
                              selectedItem === item,
                            [`${CSSname}__item--highlighted`]:
                              highlightedIndex === index
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                    : !loading && (
                        <li className={`${CSSname}__item`}>No results</li>
                      )}
                </ul>
              ) : null}
              <LoadingSpinner spinning={loading} />
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}
