'use client'
import { useEffect } from "react";
import MaxContainer from "./Layout/MaxContainer";

const InfographicModel = ({
    isOpen,
    onClose,
    children,
    modalClass,
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <MaxContainer>
            <div className="fixed top-0 left-0 w-full h-full flex p-4 px-6  items-center  justify-center z-50">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-[#10182F] "
                    onClick={onClose}
                ></div>
                <div
                    className={`fixed  w-[90%] max-h-[95%] custom-scrollbar flex flex-col gap-4 overflow-auto justify-between bg-white  rounded-lg  shadow-lg ${modalClass}`}
                >

                    <div className="w-full h-full">{children}</div>
                </div>
            </div>
        </MaxContainer>
    );
};

export default InfographicModel;
