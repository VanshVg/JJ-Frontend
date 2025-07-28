import {
  AiFillCaretRight,
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineRight,
} from "react-icons/ai";
import { BsBuildingFill } from "react-icons/bs";
import Modal from "../../../../../../components/Modal";
import { useEffect, useState } from "react";
import AddAddress from "./components/AddAddress";
import { useDeleteAddressApi, useFetchUserAddressApi } from "../../services";
import { ResponseType } from "../../../../../../types";
import { AddressType, IUserAddress } from "../../types";
import { MdLocalConvenienceStore } from "react-icons/md";
import EditAddress from "./components/EditAddress";

const AddressBook = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<IUserAddress>();
  const [isAddressChanged, setIsAddressChanged] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { fetchUserAddressApi, isLoading } = useFetchUserAddressApi();
  const { deleteAddressApi, isLoading: deleteLoading } = useDeleteAddressApi();

  const closeAddModal = () => {
    setOpenAddModal(false);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const fetchUserAddresses = async () => {
    const { data } = await fetchUserAddressApi();
    if (data && data.responseType === ResponseType.Success) {
      setUserAddresses(data?.data?.addresses);
    }
  };

  const changeAddressFlag = () => {
    setIsAddressChanged((prev) => !prev);
  };

  const deleteUserAddress = async (addressId?: number) => {
    await deleteAddressApi(addressId);
  };

  useEffect(() => {
    fetchUserAddresses();
  }, [isAddressChanged]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-primary">
      <h1 className="text-center text-[28px] font-semibold">Address Book</h1>
      <div>
        <div className="lg:flex lg:items-center lg:justify-start lg:mt-4 lg:flex-wrap">
          <div className="lg:p-3 p-2 w-full lg:w-[33%] lg:items-center">
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
          {/* <div className="w-[90%] mx-auto ">
            <div className="p-2 w-full flex flex-col gap-4"> */}
          {userAddresses &&
            userAddresses.map((address: IUserAddress) => (
              <div
                key={address.id}
                className="lg:p-3 p-2 lg:w-[33%] w-[90%] mx-auto lg:mx-0 mt-2 lg:mt-0"
              >
                <div className="border-gray-400 border-[1px] p-2 rounded-md lg:h-[145px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {address.address_type === AddressType.Work && (
                        <BsBuildingFill />
                      )}
                      {address.address_type === AddressType.Home && (
                        <AiFillHome />
                      )}
                      {address.address_type === AddressType.Other && (
                        <MdLocalConvenienceStore />
                      )}
                      <h2 className="font-semibold capitalize">
                        {address.address_type}
                      </h2>
                    </div>
                    <p className="text-left mt-2 opacity-80 text-[14px] line-clamp-3">
                      {address.address_line_1}, {address.address_line_2},{" "}
                      {address.landmark} - {address.pincode}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => {
                        setOpenEditModal(true);
                        setSelectedAddress(address);
                      }}
                    >
                      <p className="text-[14px]">Edit</p>
                      <AiFillCaretRight className="text-[12px]" />
                    </div>
                    <p
                      className="text-[14px] opacity-80 cursor-pointer"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setSelectedAddress(address);
                      }}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {/* </div>
          </div> */}
        </div>
        <Modal
          title="Add Address"
          isOpen={openAddModal}
          closeModal={closeAddModal}
          hideButtons={{
            confirm: true,
            cancel: true,
          }}
        >
          <AddAddress
            closeModal={closeAddModal}
            changeAddressFlag={changeAddressFlag}
          />
        </Modal>
        <Modal
          title="Edit Address"
          isOpen={openEditModal}
          closeModal={closeEditModal}
          hideButtons={{
            confirm: true,
            cancel: true,
          }}
        >
          <EditAddress
            closeModal={closeEditModal}
            addressData={selectedAddress}
            changeAddressFlag={changeAddressFlag}
          />
        </Modal>
        <Modal
          title="Delete Address"
          isOpen={openDeleteModal}
          closeModal={closeDeleteModal}
          confirmModal={async () => {
            await deleteUserAddress(selectedAddress?.id);
            closeDeleteModal();
            changeAddressFlag();
          }}
          disableButtons={{ confirm: deleteLoading }}
        >
          <p className="text-primary mt-2">
            Are you sure you want to delete this address from your address book?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default AddressBook;
