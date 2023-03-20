import React, { FormEvent } from 'react';
import './components.css';

class CardForm extends React.Component {
  state: {
    inputName: string;
    inputDate: string;
    selectValue: string;
    checkboxValue: string[];
    radioValue: string;
    image: string;
  };
  constructor(props: string) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      inputName: '',
      inputDate: '',
      selectValue: '',
      checkboxValue: [],
      radioValue: '',
      image: '',
    };
  }

  selectsArr = ['select1', 'select2', 'select3', 'select4', 'select5', 'select6'];
  checkboxesArr = ['option1', 'option2', 'option3', 'option4', 'option5'];
  radiosArr = ['value1', 'value2', 'value3'];

  inputNameRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputDateRef: React.RefObject<HTMLInputElement> = React.createRef();
  selectValueRef: React.RefObject<HTMLSelectElement> = React.createRef();
  imageRef: React.RefObject<HTMLInputElement> = React.createRef();

  validateForm = () => {
    const { inputName, inputDate, selectValue, checkboxValue, radioValue, image } = this.state;
    if (inputName) {
      this.inputNameRef.current?.classList.add('invalid');
    }
  };

  handleChange = () => {
    this.setState({
      inputName: this.inputNameRef.current?.value,
      inputDate: this.inputDateRef.current?.value,
      selectValue: this.selectValueRef.current?.value,
      image: this.imageRef.current?.value,
    });
    console.log(this.state);
  };

  handleCheckboxValue = (e: InputEvent<HTMLInputElement>) => {
    const { checkboxValue } = this.state;
    const value = e.target.value;
    if (value) {
      const ind = checkboxValue.findIndex((el) => el === value);
      ind >= 0 ? checkboxValue.splice(ind, 1) : checkboxValue.push(value);
      this.setState({
        checkboxValue: checkboxValue,
      });
    }
  };

  handleRadioValue = (e: InputEvent<HTMLInputElement>) => {
    this.setState({
      radioValue: e.target.value,
    });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST" onSubmit={this.handleSubmit}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    ref={this.inputNameRef}
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <input
                    ref={this.inputDateRef}
                    onChange={this.handleChange}
                    type="date"
                    name="date"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Some option
                  </label>
                  <select
                    ref={this.selectValueRef}
                    onChange={this.handleChange}
                    name="country"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {this.selectsArr.map((el, i) => {
                      return <option key={i + el}>{el}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <fieldset>
                  <legend className="contents text-sm font-semibold leading-6 text-gray-900">
                    Legend for checkboxes options
                  </legend>
                  <div className="mt-4 space-y-4">
                    {this.checkboxesArr.map((el, i) => {
                      return (
                        <div key={el + i} className="flex h-6 items-center text-sm leading-6">
                          <input
                            id={el}
                            onChange={this.handleCheckboxValue}
                            name="checkboxes"
                            type="checkbox"
                            value={el}
                            className="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor={el} className="ml-3 font-medium text-gray-900">
                            {el}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="contents text-sm font-semibold leading-6 text-gray-900">
                    Legend for radiobuttons
                  </legend>
                  <div className="mt-4 space-y-4">
                    {this.radiosArr.map((el, i) => {
                      return (
                        <div key={i + el} className="flex items-center">
                          <input
                            id={el}
                            onChange={this.handleRadioValue}
                            name="radiobuttons"
                            type="radio"
                            value={el}
                            className="h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor={el}
                            className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                          >
                            {el}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CardForm;
