import React, { FormEvent } from 'react';
import InputCheckBox from '../formElements/inputCheckBox';
import InputMultyple from '../formElements/inputMultyple';
import InputString from '../formElements/inputString';
import SelectOptions from '../formElements/selectOptions';
import './components.css';

export type CardFormType = {
  inputName: string;
  inputDate: string;
  description: string;
  selectValue: string;
  checkboxValue: string[];
  radioValue: string;
  file: string;
  agree: boolean;
  isFormValid: boolean;
  errorName?: string;
  errorDate?: string;
  errorDesc?: string;
  errorSelect?: string;
  errorCheckbox?: string;
  errorRadio?: string;
  errorFile?: string;
  errorAgree?: string;
};

type LinkArray = {
  name: string;
  refLink: React.RefObject<HTMLInputElement>;
}[];

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
      description: '',
      selectValue: '',
      checkboxValue: [],
      radioValue: '',
      file: '',
      agree: false,
      isFormValid: true,
      errorName: '',
      errorDate: '',
      errorDesc: '',
      errorSelect: '',
      errorCheckbox: '',
      errorRadio: '',
      errorFile: '',
      errorAgree: '',
    };
    console.log(props);
  }

  selectsArr = ['select1', 'select2', 'select3', 'select4', 'select5', 'select6'];
  checkboxesArr: LinkArray = ['option1', 'option2', 'option3', 'option4', 'option5'].map((el) => {
    return {
      name: el,
      refLink: React.createRef(),
    };
  });
  radiosArr: LinkArray = ['value1', 'value2', 'value3'].map((el) => {
    return {
      name: el,
      refLink: React.createRef(),
    };
  });

  inputNameRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputDateRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputTextaria: React.RefObject<HTMLTextAreaElement> = React.createRef();
  inputAgreeRef: React.RefObject<HTMLInputElement> = React.createRef();
  selectValueRef: React.RefObject<HTMLSelectElement> = React.createRef();
  fileRef: React.RefObject<HTMLInputElement> = React.createRef();
  saveBtnRef: React.RefObject<HTMLButtonElement> = React.createRef();
  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  validateForm = () => {
    const {
      inputName,
      inputDate,
      description,
      selectValue,
      checkboxValue,
      radioValue,
      agree,
      file,
    } = this.state;
    let isFormValid = true;
    if (inputName === '') {
      this.inputNameRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      this.setState({ errorName: 'name cant be empty' });
    } else {
      this.setState({ errorName: '' });
    }
    if (inputDate === '') {
      this.inputDateRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      this.setState({ errorDate: 'date cant be empty' });
    } else {
      this.setState({ errorDate: '' });
    }
    if (description.length <= 10) {
      this.inputTextaria.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      this.setState({ errorDesc: 'description mast be 10 and more' });
    } else {
      this.setState({ errorDesc: '' });
    }
    if (selectValue === '' || selectValue === undefined) {
      this.selectValueRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      this.setState({ errorSelect: 'you must select any value' });
    } else {
      this.setState({ errorSelect: '' });
    }
    if (checkboxValue.length === 0) {
      isFormValid = false;
      this.setState({ errorCheckbox: 'you must select one or more value' });
    } else {
      this.setState({ errorCheckbox: '' });
    }
    if (radioValue === '' || radioValue === undefined) {
      isFormValid = false;
      this.setState({ errorRadio: 'you must select any value' });
    } else {
      this.setState({ errorRadio: '' });
    }
    if (file === '') {
      this.fileRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      this.setState({ errorFile: 'add any picture' });
    } else {
      this.setState({ errorFile: '' });
    }
    if (!agree) {
      this.inputAgreeRef.current?.setAttribute('aria-invalid', 'true');
      isFormValid = false;
      this.setState({ errorAgree: 'You must agree the terms' });
    } else {
      this.setState({ errorAgree: '' });
    }

    if (!isFormValid) {
      this.setState({ isFormValid: false });
    }
    console.log(this.state);
    return isFormValid;
  };

  addCard() {
    this.props.onFormSubmit(this.state);
    this.formRef.current?.reset();
    this.setState({
      inputName: '',
      inputDate: '',
      description: '',
      selectValue: '',
      checkboxValue: [],
      radioValue: '',
      file: '',
      agree: false,
      isFormValid: true,
      errorName: '',
      errorDate: '',
      errorDesc: '',
      errorSelect: '',
      errorCheckbox: '',
      errorRadio: '',
      errorFile: '',
      errorAgree: '',
    });
  }

  handleBlur = () => {
    if (!this.state.isFormValid) {
      this.setState({ isFormValid: true });
    }
  };

  getCheckedValues = (arr: LinkArray): string[] => {
    return arr.filter((el) => el.refLink.current?.checked).map((el) => el.name);
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.setState(
      {
        inputName: this.inputNameRef.current?.value,
        inputDate: this.inputDateRef.current?.value,
        description: this.inputTextaria.current?.value,
        selectValue: this.selectValueRef.current?.value,
        agree: this.inputAgreeRef.current?.checked,
        checkboxValue: this.getCheckedValues(this.checkboxesArr),
        radioValue: this.getCheckedValues(this.radiosArr)[0],
        isFormValid: false,
      },
      () => {
        if (this.validateForm()) {
          this.addCard();
        }
      }
    );
  };

  handleFile = () => {
    if (
      this.fileRef.current &&
      this.fileRef.current.files &&
      this.fileRef.current.files?.length > 0
    ) {
      const file = this.fileRef.current.files[0];
      if (file.type.startsWith('image')) {
        this.setState({
          file: window.URL.createObjectURL(file),
        });
        this.setState({ errorFile: '' });
      } else {
        this.setState({ errorFile: 'you must select an image' });
      }
    }
  };

  render() {
    return (
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form ref={this.formRef} onSubmit={this.handleSubmit} onChange={this.handleBlur}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <InputString
                  type="text"
                  name="name"
                  error={this.state.errorName}
                  refLink={this.inputNameRef}
                />
                <InputString
                  type="date"
                  name="date"
                  error={this.state.inputDate}
                  refLink={this.inputDateRef}
                />
                <InputString
                  type="textarea"
                  name="desc"
                  error={this.state.errorDesc}
                  refLink={this.inputTextaria}
                />

                <SelectOptions
                  name={'nameSelection'}
                  array={this.selectsArr}
                  refLink={this.selectValueRef}
                  desc="Select some option"
                  error={this.state.errorSelect}
                />
              </div>
            </div>

            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <InputMultyple
                  name={'checkboxes'}
                  type={'checkbox'}
                  desc="Legend for checkboxes options"
                  error={this.state.errorCheckbox}
                  array={this.checkboxesArr}
                />
                <InputMultyple
                  name={'radio-values'}
                  type={'radio'}
                  desc="Legend for radiobuttons"
                  error={this.state.errorRadio}
                  array={this.radiosArr}
                />
                <fieldset>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2 flex flex-col">
                      <div className="block h-40 w-40 overflow-hidden bg-gray-100">
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
                        className="relative mt-2 w-40 cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                      <p className="ml-8 mt-0 text-xs text-red-500">{this.state.errorFile}</p>
                    </div>
                  </div>
                </fieldset>
                <InputCheckBox
                  name="agree"
                  desc="Agree the terms"
                  error={this.state.errorAgree}
                  refLink={this.inputAgreeRef}
                />
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
