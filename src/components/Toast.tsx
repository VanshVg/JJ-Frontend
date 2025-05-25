import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSelector, ToastShow } from "../redux/slices/toast.slice";

const Toast = () => {
  const toastMessage = useSelector(toastSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (toastMessage.message) {
      if (toastMessage.type === "error") {
        toast.error(toastMessage.message);
      } else {
        toast.success(toastMessage.message);
      }
      setTimeout(() => {
        dispatch(ToastShow({ message: null, type: null }));
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage?.message]);

  return (
    <ToastContainer
      className="z-50"
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
    />
  );
};

export default Toast;
