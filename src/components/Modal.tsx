// Modal.jsx
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonDisplayType, IModalProps } from "./types";
import Button from "./Button";

const Modal = ({
  isOpen,
  closeModal,
  confirmModal,
  title,
  children,
  //   width,
  buttonsText = {
    confirm: "Confirm",
    cancel: "Cancel",
  },
  hideButtons = {
    confirm: false,
    cancel: false,
  },
  disableButtons = {
    confirm: false,
    cancel: false,
  },
}: IModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 lg:max-w-md w-full -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg h-full lg:h-auto flex">
          <div className="flex flex-col items-center justify-center w-full">
            <Dialog.Title className="text-xl font-semibold">
              {title}
            </Dialog.Title>
            <div className="w-full">{children}</div>

            <div className="flex justify-center gap-4">
              {!hideButtons.cancel && (
                <Button
                  label={buttonsText.cancel as string}
                  type="button"
                  isLoading={disableButtons.cancel}
                  isDisabled={disableButtons.cancel}
                  displayType={ButtonDisplayType.Secondary}
                  onClickHandler={closeModal}
                  externalClasses="text-[12px] py-3 px-4 mt-8 lg:text-[14px] font-primary"
                />
              )}
              {!hideButtons.confirm && (
                <Button
                  label={buttonsText.confirm as string}
                  type="button"
                  isLoading={disableButtons.confirm}
                  isDisabled={disableButtons.confirm}
                  displayType={ButtonDisplayType.Primary}
                  externalClasses="text-[12px] py-3 px-4 mt-8 lg:text-[14px] font-primary"
                  onClickHandler={confirmModal}
                />
              )}
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 text-primary cursor-pointer"
              aria-label="Close"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
