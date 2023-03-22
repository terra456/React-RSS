import React, { FormEvent } from 'react';
import './components.css';

type CardFormType = {
  inputName: string;
  inputDate: string;
  selectValue: string;
  checkboxValue: string[];
  radioValue: string;
  file: string;
  agree: boolean;
  isFormValid: boolean;
};

class CardForm extends React.Component {
  state: CardFormType;

  declare props: {
    onFormSubmit: (obj: CardFormType) => void;
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      inputName: '',
      inputDate: '',
      selectValue: '',
      checkboxValue: [],
      radioValue: '',
      file: '',
      agree: false,
      isFormValid: true,
    };
    console.log(props);
  }

  selectsArr = ['select1', 'select2', 'select3', 'select4', 'select5', 'select6'];
  checkboxesArr = ['option1', 'option2', 'option3', 'option4', 'option5'];
  radiosArr = ['value1', 'value2', 'value3'];

  inputNameRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputDateRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputAgreeRef: React.RefObject<HTMLInputElement> = React.createRef();
  selectValueRef: React.RefObject<HTMLSelectElement> = React.createRef();
  checkLegendRef: React.RefObject<HTMLLegendElement> = React.createRef();
  radioLegendRef: React.RefObject<HTMLLegendElement> = React.createRef();
  fileRef: React.RefObject<HTMLInputElement> = React.createRef();
  saveBtnRef: React.RefObject<HTMLButtonElement> = React.createRef();

  validateForm = () => {
    const { inputName, inputDate, selectValue, checkboxValue, radioValue, agree } = this.state;
    let isFormValid = true;
    if (inputName === '') {
      this.inputNameRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      console.log('here');
    }
    if (inputDate === '') {
      this.inputDateRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      console.log('here');
    }
    if (selectValue === '' || selectValue === undefined) {
      this.selectValueRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
    }
    if (checkboxValue.length === 0) {
      this.checkLegendRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      console.log('here');
    }
    if (radioValue === '' || radioValue === undefined) {
      this.radioLegendRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      console.log('here');
    }
    // if (file) {
    //   this.fileRef.current?.setAttribute('aria-invalid', 'true');
    //   isFormValid = false;
    //   console.log('here');
    // }
    if (!agree) {
      this.inputAgreeRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      console.log('here agree');
    }

    if (!isFormValid) {
      this.setState({ isFormValid: false });
    }
    console.log(isFormValid);
    return isFormValid;
  };

  addCard() {
    this.props.onFormSubmit([this.state]);
    // this.setState({
    //   inputName: '',
    //   inputDate: '',
    //   selectValue: '',
    //   checkboxValue: [],
    //   radioValue: '',
    //   file: '',
    //   agree: false,
    //   isFormValid: true,
    // });
  }

  handleBlur = (e: InputEvent<HTMLInputElement>) => {
    if (!this.state.isFormValid) {
      e.target.setAttribute('aria-invalid', 'false');
      this.setState({ isFormValid: true });
    }
  };

  handleChange = () => {
    this.setState({
      inputName: this.inputNameRef.current?.value,
      inputDate: this.inputDateRef.current?.value,
      selectValue: this.selectValueRef.current?.value,
      agree: this.inputAgreeRef.current?.checked,
    });
  };

  handleMultyValue = (e: InputEvent<HTMLInputElement>) => {
    const { checkboxValue } = this.state;
    const value = e.target.value;
    if (value) {
      const ind = checkboxValue.findIndex((el) => el === value);
      ind >= 0 ? checkboxValue.splice(ind, 1) : checkboxValue.push(value);
      this.setState({
        checkboxValue: checkboxValue,
      });
    }
    this.checkLegendRef.current?.setAttribute('aria-invalid', 'false');
  };

  handleRadioValue = (e: InputEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.radioLegendRef.current?.setAttribute('aria-invalid', 'false');
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.addCard();
    }
    console.log(this.state);
  };

  handleFile = () => {
    if (
      this.fileRef.current &&
      this.fileRef.current.files &&
      this.fileRef.current.files?.length > 0
    ) {
      const file = this.fileRef.current.files[0];
      this.setState({
        file: window.URL.createObjectURL(file),
      });
    }
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
                    onBlur={this.handleBlur}
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
                    onBlur={this.handleBlur}
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
                    onBlur={this.handleBlur}
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
                  <legend
                    ref={this.checkLegendRef}
                    className="contents text-sm font-semibold leading-6 text-gray-900"
                  >
                    Legend for checkboxes options
                  </legend>
                  <div className="mt-4 space-y-4">
                    {this.checkboxesArr.map((el, i) => {
                      return (
                        <div key={el + i} className="flex h-6 items-center text-sm leading-6">
                          <input
                            id={el}
                            onChange={this.handleMultyValue}
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
                <fieldset aria-required="true">
                  <legend
                    ref={this.radioLegendRef}
                    className="contents text-sm font-semibold leading-6 text-gray-900"
                  >
                    Legend for radiobuttons
                  </legend>
                  <div aria-required="false" className="mt-4 space-y-4 aria-required:text-red-500">
                    {this.radiosArr.map((el, i) => {
                      return (
                        <div key={i + el} className="flex items-center">
                          <input
                            id={el}
                            onChange={this.handleRadioValue}
                            name="radioValue"
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
                <fieldset>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2 flex items-center">
                      <div className="h-30 w-30 inline-block overflow-hidden bg-gray-100">
                        {(() => {
                          if (this.state.file && this.fileRef.current?.files) {
                            return <img src={this.state.file} />;
                          } else {
                            return (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            );
                          }
                        })()}
                      </div>
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          ref={this.fileRef}
                          onChange={this.handleFile}
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <div className="mt-4 space-y-4">
                    <div className="flex h-6 items-center text-sm leading-6">
                      <input
                        id="agree"
                        ref={this.inputAgreeRef}
                        onChange={this.handleChange}
                        name="agree"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="agree" className="ml-3 font-medium text-gray-900">
                        Agree the terms
                      </label>
                    </div>
                    <span className="ml-8 -mt-0 text-xs">
                      {!this.state.agree ? 'You must agree the terms' : ''}
                    </span>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                disabled={!this.state.isFormValid}
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-gray-500 disabled:hover:bg-gray-500"
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
