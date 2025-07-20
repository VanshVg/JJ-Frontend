import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../../../../components/form-fields/Input";
import ContactInput from "../../../../../../components/form-fields/ContactInput";
import { AiFillInfoCircle } from "react-icons/ai";
import { ButtonDisplayType } from "../../../../../../components/types";
import Button from "../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, setUser } from "../../../../../../redux/slices/auth.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../../schemas";
import { useEditProfileApi } from "../../services";
import { IEditProfile } from "../../types";
import { ResponseType, UserRoles } from "../../../../../../types";

const EditProfile = () => {
  const { userData } = useSelector(getAuth);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    ...(userData && {
      defaultValues: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        contact_no: userData.contact_no,
      },
    }),
    resolver: yupResolver(editProfileSchema),
  });

  const { editProfileApi, isLoading } = useEditProfileApi();

  const dispatch = useDispatch();

  const submitHandler: SubmitHandler<IEditProfile> = async (
    profileData: IEditProfile
  ) => {
    const { data } = await editProfileApi(profileData);

    if (data.responseType === ResponseType.Success) {
      dispatch(
        setUser({
          userData: {
            firstname: profileData.firstname,
            lastname: profileData.lastname,
            contact_no: profileData.contact_no,
            role: userData?.role as UserRoles,
          },
        })
      );
    }
  };

  return (
    <div className="text-primary">
      <h1 className="text-center text-[28px] font-semibold">Edit Profile</h1>
      <form
        className="w-[80%] flex flex-col mx-auto mt-5 lg:w-[60%]"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          name="firstname"
          control={control}
          type="text"
          placeholder="Enter a first name"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="lastname"
          control={control}
          type="text"
          placeholder="Enter a last name"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <ContactInput
          name="contact_no"
          control={control}
          placeholder="Mobile Number"
          errors={errors}
          externalClasses="mt-4 opacity-70 lg:text-[14px]"
          isDisabled={true}
        />
        <div className="mt-2 flex items-center justify-start gap-2">
          <AiFillInfoCircle />
          <p className="text-[12px] opacity-80">
            You can't edit your mobile number
          </p>
        </div>
        <Button
          label="Update profile"
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          displayType={ButtonDisplayType.Primary}
          externalClasses="text-[12px] mx-auto py-3 px-4 mt-6 md:mt-4 lg:mt-6 lg:text-[14px]"
        />
      </form>
    </div>
  );
};

export default EditProfile;
