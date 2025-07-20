import {
  AiFillCaretRight,
  AiFillPlusCircle,
  AiOutlineRight,
} from "react-icons/ai";
import { BsBuildingFill } from "react-icons/bs";
import Modal from "../../../../../../components/Modal";
import { useState } from "react";

const AddressBook = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(true);

  const closeAddModal = () => {
    setOpenAddModal(false);
  };

  return (
    <div className="text-primary">
      <h1 className="text-center text-[28px] font-semibold">Address Book</h1>
      <div>
        <div className="lg:flex lg:items-center lg:justify-start lg:mt-4">
          <div className="p-2 w-full lg:w-[33%] lg:items-center">
            <div
              className={`rounded-lg bg-primary mt-2 p-2 flex justify-between items-center cursor-pointer text-white lg:h-[145px] lg:rounded-md lg:border-[1px] lg:border-primary lg:bg-primary lg:p-0 lg:mt-0 lg:hover:opacity-90 lg:duration-200 lg:transition-opacity w-[90%] mx-auto lg:w-full`}
              onClick={() => {
                setOpenAddModal(true);
              }}
            >
              <div className="flex items-center gap-2 lg:mx-auto">
                <AiFillPlusCircle />
                <p>Add Address</p>
              </div>
              <AiOutlineRight className="lg:hidden" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 lg:hidden">
            <div className="opacity-40 bg-primary h-[1px] w-[25%]" />
            <p>Saved Addresses</p>
            <div className="opacity-40 bg-primary h-[1px] w-[25%]" />
          </div>
          <div className="w-[90%] mx-auto lg:w-[33%] lg:mx-0">
            <div className="p-2 w-full">
              <div className="border-gray-400 border-[1px] p-2 rounded-md lg:h-[145px]">
                <div className="flex items-center gap-2">
                  <BsBuildingFill />
                  <h2 className="font-semibold">Work</h2>
                </div>
                <p className="text-left mt-2 opacity-80 text-[14px]">
                  5 - Rameshwar villa society, Behind Purshottam garden, Hansot
                  Road, Ankleshwar - 393001
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <p className="text-[14px]">Edit</p>
                    <AiFillCaretRight className="text-[12px]" />
                  </div>
                  <p className="text-[14px] opacity-80 cursor-pointer">
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Add Address"
          open={openAddModal}
          closeModal={closeAddModal}
        >
          <p>Add Address Child</p>
        </Modal>
      </div>
    </div>
  );
};

export default AddressBook;
