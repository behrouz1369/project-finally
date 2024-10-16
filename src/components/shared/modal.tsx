import React, { SetStateAction } from "react"
import {  Dialog, DialogPanel } from '@headlessui/react'


interface Props {
    children : React.ReactElement,
    isOpen?:boolean,
    setIsOpen: (() => void) | React.Dispatch<SetStateAction<boolean>>,
}

export default function Modal({children , isOpen = true , setIsOpen} : Props) {

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-[rgba(0,0,0,.5)]">
                <DialogPanel className={`w-1/2 lg:w-1/4`}>
                        {children}
                </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
