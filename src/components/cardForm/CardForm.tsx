import React, { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Character } from 'rickmortyapi';
import { IFormValues } from 'types';
import { rickAndMortyApi } from '../../services/fetchAPI';
import { newCardsSlice } from '../../store/reducers/NewCardsSlice';
import InputCheckBox from '../formElements/inputCheckBox';
import InputMultyple from '../formElements/inputMultyple';
import InputString from '../formElements/inputString';
import SelectOptions from '../formElements/selectOptions';
import './components.css';

function CardForm() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  }: UseFormReturn<IFormValues> = useForm();

  const { addCard } = newCardsSlice.actions;
  const dispatch = useDispatch();

  const watchFile = watch('fileSrc');

  const species: string[] = [
    'Human',
    'Alien',
    'Humanoid',
    'unknown',
    'Poopybutthole',
    'Mythological Creature',
    'Animal',
    'Robot',
    'Cronenberg',
    'Disease',
  ];
  const checkboxesArr: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];
  const { data } = rickAndMortyApi.useGetAllEpisodesQuery(checkboxesArr);
  const [episodes, setEpisodes] = useState(['']);

  useEffect(() => {
    if (data) {
      const res = data.map((el) => `${el.id}: ${el.name}`);
      setEpisodes(res);
    }
  }, [data]);

  const radiosStetus: string[] = ['Dead', 'Alive', 'unknown'];
  const radiosGender: string[] = ['Female', 'Male', 'Genderless', 'unknown'];

  const validateForm = (data: IFormValues) => {
    const { name, date, desc, selectValue, checkboxValue, status, gender, agree } = data;
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
    if (!status) {
      isValid = false;
      setError('status', { type: 'custom', message: 'you must select any status' });
    }
    if (!gender) {
      isValid = false;
      setError('gender', { type: 'custom', message: 'you must select a gender' });
    }
    if (!agree) {
      isValid = false;
      setError('agree', { type: 'custom', message: 'You must agree the terms' });
    }
    // if (!file[0]) {
    //   isValid = false;
    //   setError('file', { type: 'custom', message: 'add any picture' });
    // }
    if (isValid) {
      onFormSubmit(data);
    }
  };

  const onFormSubmit = (obj: IFormValues) => {
    const newCard: Character = {
      id: 1,
      name: obj.name,
      url: obj.desc,
      created: obj.date,
      status: obj.status,
      species: obj.selectValue,
      type: '',
      gender: obj.gender,
      image: watchFile || './localhost/5',
      episode: obj.checkboxValue,
      origin: {
        name: 'string',
        url: 'string',
      },
      location: {
        name: 'string',
        url: 'string',
      },
    };
    dispatch(addCard(newCard));
    resetForm();
  };

  const resetForm = () => {
    reset();
  };

  const onSubmit = (data: IFormValues) => {
    validateForm(data);
  };

  const handleFile = (e) => {
    if (e.target.files[0].type.startsWith('image')) {
      setValue('fileSrc', window.URL.createObjectURL(e.target.files[0]));
    } else {
      setError('file', { type: 'custom', message: 'you must add an image' });
    }
  };

  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
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
                options={species}
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
                options={episodes}
              />
              <InputMultyple
                type={'radio'}
                desc="Select a gender"
                name="gender"
                register={register}
                errMessage={errors.gender?.message}
                options={radiosGender}
              />
              <InputMultyple
                type={'radio'}
                desc="Check a status"
                name="status"
                register={register}
                errMessage={errors.status?.message}
                options={radiosStetus}
              />
              <fieldset>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                  <div className="mt-2 flex flex-col">
                    <div className="block h-40 w-40 overflow-hidden bg-gray-100">
                      {(() => {
                        if (watchFile) {
                          return <img src={watchFile} />;
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
                        data-testid="file-upload"
                        id="file-upload"
                        {...register('file')}
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
              <InputCheckBox
                name="agree"
                desc="Agree the terms"
                register={register}
                error={errors.agree?.message}
              />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              data-testid="submit-form"
              disabled={!isDirty || !isValid}
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
