import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import ExpenseForm from './ExpenseForm'


export default function ExpenseModal() {

    const { state, dispatch } = useBudget()

  return (
    <>
      <div className="fixed left-7 bottom-5 md:bottom-16 flex items-center justify-center">
        <button
          type="button"
          onClick={() => dispatch({type: 'show-modal'})}
        >
          <PlusCircleIcon className={`w-20 h-20 text-cyan-500 hover:text-cyan-600 rounded-full`} />
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type: 'close-modal'})}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-55" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#080808] border border-[#201e1e] shadow-xl shadow-cyan-900 p-8 transition-all">
                        <ExpenseForm/>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}