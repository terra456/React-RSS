import React, { Fragment, useEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getEpisode } from 'rickmortyapi';
import { rickAndMortyApi } from '../../services/fetchAPI';
import Spinner from '../spinner/Spinner';

export interface Props {
  el: number;
  open: boolean;
  handleClose: () => void;
}

function Modal({ el, open, handleClose }: Props) {
  const { data } = rickAndMortyApi.useGetCharacterByIdQuery(el);
  const [episodesArr, setEpisodesArr] = useState(['']);

  useEffect(() => {
    if (open && data) {
      const arr: number[] = data.episode.map((el: string) => {
        const i = el.lastIndexOf('/');
        return Number(el.slice(i + 1));
      });
      getEpisode(arr).then(({ data }) => {
        let res: string[] = [];
        if (Array.isArray(data)) {
          res = data.map((result) => `${result.id}: ${result.name}`);
        } else {
          res.push(`${data.id}: ${data.name}`);
        }
        setEpisodesArr(res);
      });
    }
  }, [data, open]);

  if (data === undefined) {
    return <Spinner />;
  }

  // const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    data-testid="close-btn"
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => handleClose()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div
                    data-testid="modal-div"
                    className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
                  >
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={data.image}
                        alt={data.name}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{data.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          Character information
                        </h3>

                        <p className="text-2xl text-gray-900">Species: {data.species}</p>
                        <p className="text-xl text-gray-900">type: {data.type}</p>
                        <p className="text-xl text-gray-900">gender: {data.gender}</p>
                        <p className="text-xl text-gray-900">status: {data.status}</p>
                        <p className="text-xl text-gray-900">created: {data.created}</p>
                        <p className="text-xl text-gray-900">Origin location: {data.origin.name}</p>
                        <p className="text-xl">Last known location: {data.location.name}</p>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="text-xl">
                          List of episodes in which this character appeared
                        </h3>
                        {episodesArr?.map((el) => {
                          return (
                            <p className="text-sm text-gray-900" key={el}>
                              {el}
                            </p>
                          );
                        })}
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default Modal;
