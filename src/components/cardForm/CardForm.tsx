import React from 'react';
import { useForm } from 'react-hook-form';
import { IFormValues } from 'types';
// import InputCheckBox from '../formElements/inputCheckBox';
import InputMultyple from '../formElements/inputMultyple';
import InputString from '../formElements/inputString';
import SelectOptions from '../formElements/selectOptions';
import './components.css';

export interface Props {
  onFormSubmit: (obj: IFormValues) => void;
}

function CardForm(props: Props) {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    // Read the formState before render to subscribe the form state through the Proxy
    formState: { errors, isDirty, isSubmitting, touchedFields },
  } = useForm();

  const selectsArr: string[] = ['select1', 'select2', 'select3', 'select4', 'select5', 'select6'];
  const checkboxesArr: string[] = ['option1', 'option2', 'option3', 'option4', 'option5'];
  const radiosArr: string[] = ['value1', 'value2', 'value3'];

  const validateForm = (data: IFormValues) => {
    const { name, date, desc, selectValue, checkboxValue, radioValue, file } = data;
    let isValid = true;
    if (name === '') {
      isValid = false;
      setError('name', { type: 'custom', message: 'name is required' });
    }
    if (date === '') {
      isValid = false;
      setError('date', { type: 'custom', message: 'date cant be empty' });
    }
    if (desc.length <= 10) {
      isValid = false;
      setError('desc', { type: 'custom', message: 'description mast be 10 and more' });
    }
    if (selectValue === '' || selectValue === undefined) {
      isValid = false;
      setError('selectValue', { type: 'custom', message: 'you must select any value' });
    }
    if (!Array.isArray(checkboxValue) || checkboxValue.length === 0) {
      isValid = false;
      setError('checkboxValue', { type: 'custom', message: 'you must select one or more value' });
    }
    if (radioValue === '' || radioValue === undefined || radioValue === null) {
      isValid = false;
      setError('radioValue', { type: 'custom', message: 'you must select any value' });
    }
    if (!file[0].type.startsWith('image')) {
      // fileRef.current?.setAttribute('aria-invalid', 'true');
      isValid = false;
      setError('file', { type: 'custom', message: 'add any picture' });
    } else {
      console.log(file);
    }
    // if (!agree) {
    //   isValid = false;
    //   setState({ errorAgree: 'You must agree the terms' });
    // } else {
    //   setState({ errorAgree: '' });
    // }

    if (isValid) {
      addCard(data);
    }
  };

  const addCard = (data: IFormValues) => {
    props.onFormSubmit(data);
    // formRef.current?.reset();
  };

  const onSubmit = (data: IFormValues) => {
    console.log(data);
    validateForm(data);
  };

  const handleFile = () => {
    console.log(getValues('file'));
    if (getValues('file')[0].type.startsWith('image')) {
      setValue('fileSrc', window.URL.createObjectURL(getValues('file')[0]));
    }
  };

  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        // onChange={handleBlur}
        data-testid="form"
      >
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <InputString
                type="text"
                label="name"
                register={register}
                errMessage={errors.name?.message}
              />
              <InputString
                type="date"
                label="date"
                register={register}
                errMessage={errors.date?.message}
              />
              <InputString
                type="textarea"
                label="desc"
                register={register}
                errMessage={errors.desc?.message}
              />
              <SelectOptions
                label="Select some option"
                name="selectValue"
                register={register}
                options={selectsArr}
                errMessage={errors.selectValue?.message}
              />
            </div>
          </div>

          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <InputMultyple
                type={'checkbox'}
                desc="Legend for checkboxes options"
                name="checkboxValue"
                register={register}
                errMessage={errors.checkboxValue?.message}
                options={checkboxesArr}
              />
              <InputMultyple
                type={'radio'}
                desc="Legend for radiobuttons"
                name="radioValue"
                register={register}
                errMessage={errors.radioValue?.message}
                options={radiosArr}
              />
              <fieldset>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                  <div className="mt-2 flex flex-col">
                    <div className="block h-40 w-40 overflow-hidden bg-gray-100">
                      {(() => {
                        if (getValues('fileSrc')) {
                          return <img src={getValues('fileSrc')} />;
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
                        {...register('file', { required: true })}
                        onChange={handleFile}
                        name="file"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="ml-8 mt-0 text-xs text-red-500">{errors.file?.message}</p>
                  </div>
                </div>
              </fieldset>
              {/*<InputCheckBox
                name="agree"
                desc="Agree the terms"
                error={state.errorAgree}
                refLink={inputAgreeRef}
              />*/}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              // disabled={isDirty}
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

export default CardForm;
