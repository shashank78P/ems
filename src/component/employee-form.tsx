import { useEffect, useState } from "react";
import useFetchHook from "../hooks/useFetchHook";
import Button from "./UI/button";
import Input from "./UI/Input";
import InputContainer from "./UI/InputContainer";
import {
  courseEnum,
  designationEnum,
  genderEnum,
} from "./employee-list/EmployeeListTable";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({
  defaultCourse,
  defaultDesignation,
  defaultEmail,
  defaultGender,
  defaultImgUpload,
  defaultMobileNo,
  defaultName,
  isEdit,
  employeeId
}: prop) => {
  const {
    data: fileUpload,
    error: fileUploadError,
    handleFetch: handleFileUpload,
    loading: fileUploadLoading,
    message: fileUploadMessage,
  } = useFetchHook({ isJsonContentType: false });

  const { data, error, handleFetch, loading } = useFetchHook({
    isJsonContentType: true,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState<designationEnum>(
    designationEnum.Developer
  );
  const [gender, setGender] = useState<genderEnum>(genderEnum.M);
  const [course, setCourse] = useState<courseEnum[]>([]);
  const [imgUpload, setImgUpload] = useState<File | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    defaultName && setName(defaultName);
    defaultCourse && setCourse(defaultCourse);
    defaultMobileNo && setMobileNo(defaultMobileNo);
    defaultDesignation && setDesignation(defaultDesignation);
    defaultGender && setGender(defaultGender);
    defaultEmail && setEmail(defaultEmail);
  }, [
    defaultCourse,
    defaultDesignation,
    defaultEmail,
    defaultGender,
    defaultImgUpload,
    defaultMobileNo,
    defaultName,
  ]);

  const employeeDetailsPostHandler = () => {
    handleFetch({
      method: isEdit ? "PUT" : "POST",
      url: isEdit ? `employee/update/${employeeId}` : "employee/create",
      body: JSON.stringify({
        name: name,
        email: email,
        mobileNumber: mobileNo,
        gender: gender,
        designation: designation,
        course: course,
        imageUrl: fileUpload?._data?.path,
      }),
    });
  };

  useEffect(() => {
    if (fileUploadError) {
      toast.error(
        fileUploadMessage ? fileUploadMessage : "File not uploaded!."
      );
      return;
    } else if (fileUpload?._success) {
      employeeDetailsPostHandler();
      toast.success("File uploaded!.");
    }
  }, [
    fileUpload?._success,
    fileUploadError,
    fileUploadLoading,
    fileUploadMessage,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to ${isEdit ? "update" : "added"} employee!.`);
      return;
    } else if (data?._success) {
      toast.success(`Employee ${isEdit ? "update" : "added"} successfully!.`);
      navigate("/employees");
    }
  }, [data, error, loading, isEdit]);

  const uploadFile = () => {
    if (imgUpload) {
      let formData = new FormData();
      formData.append("profileImage", imgUpload);
      handleFileUpload({
        method: "POST",
        url: "upload/profile-image-upload",
        body: formData,
      });
    }
  };

  const courseChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.checked) {
      setCourse((prev) => [...prev, e?.target?.value as courseEnum]);
    } else {
      setCourse(course?.filter((c) => c != (e?.target?.value as courseEnum)));
    }
  };
  return (
    <div>
      <form
        action=""
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();

          if (loading || fileUploadLoading) return;

          if (isEdit) {
            if (!imgUpload) {
              employeeDetailsPostHandler();
            } else {
              uploadFile();
            }
          } else {
            uploadFile();
          }
        }}
      >
        <InputContainer label="User Name">
          <Input
            name="User Name"
            type="text"
            required={true}
            value={name}
            onChangeHandler={(e) => {
              setName(e?.target?.value);
            }}
            placeholder="John Doe"
          />
        </InputContainer>

        <InputContainer label="email">
          <Input
            name="email"
            type="email"
            required={true}
            value={email}
            onChangeHandler={(e) => {
              setEmail(e?.target?.value);
            }}
            placeholder="johndoe@gmail.com"
          />
        </InputContainer>

        <InputContainer label="Mobile Number">
          <Input
            name="Mobile Number"
            type="number"
            required={true}
            value={mobileNo}
            onChangeHandler={(e) => {
              setMobileNo(e?.target?.value);
            }}
            placeholder=""
          />
        </InputContainer>

        <InputContainer label="Designation">
          <select
            className="border p-3 outline-none w-full rounded-md mt-3"
            onChange={(e) => {
              setDesignation(e?.target?.value as designationEnum);
            }}
          >
            {designationProp?.map((des) => (
              <option
                key={des.label}
                value={des?.value}
                selected={des.value == designation}
              >
                {des?.label}
              </option>
            ))}
          </select>
        </InputContainer>

        <InputContainer label="Gender" classNameStyle="">
          <div className="flex gap-6 mt-3">
            <div className="flex gap-3">
              Male
              <Input
                name="Gender"
                onChangeHandler={(e) => {
                  setGender(e?.target?.value as genderEnum);
                }}
                value={"M"}
                type="radio"
                checked={gender == "M"}
              />
            </div>

            <div className="flex gap-3">
              Female
              <Input
                checked={gender == "F"}
                onChangeHandler={(e) => {
                  setGender(e?.target?.value as genderEnum);
                }}
                name="Gender"
                value={"F"}
                type="radio"
              />
            </div>
          </div>
        </InputContainer>

        <InputContainer label="Course" classNameStyle="">
          <label htmlFor="Course"></label>
          <div className="flex gap-6 mt-3">
            <div className="flex gap-3">
              MCA
              <Input
                onChangeHandler={courseChangeHandler}
                name="course"
                value={"MCA"}
                type="checkbox"
                checked={course?.includes("MCA" as courseEnum)}
              />
            </div>

            <div className="flex gap-3">
              BCA
              <Input
                onChangeHandler={courseChangeHandler}
                checked={course?.includes("BCA" as courseEnum)}
                name="course"
                value={"BCA"}
                type="checkbox"
              />
            </div>
            <div className="flex gap-3">
              BSC
              <Input
                onChangeHandler={courseChangeHandler}
                name="course"
                checked={course?.includes("BSC" as courseEnum)}
                value={"BSC"}
                type="checkbox"
              />
            </div>
          </div>
        </InputContainer>

        <InputContainer label="Image Upload">
          <input
            name="Image Upload"
            type="file"
            className="border p-3 outline-none w-full rounded-md mt-3"
            accept="image/*"
            onChange={(e) => {
              if (e?.target?.files) {
                let file = e?.target?.files?.[0];
                if (
                  file?.type?.endsWith("jpeg") ||
                  file?.type?.endsWith("png")
                ) {
                  setImgUpload(file);
                } else {
                  toast.error("Only jpeg and png file type are allowed!.");
                }
              }
            }}
          />
        </InputContainer>

        <div className="w-full mt-3 flex justify-end items-center">
          <Button type="submit" classNameStyle="">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;

let designationProp = [
  {
    value: "HR",
    label: "HR",
  },
  {
    value: "Manager",
    label: "Manager",
  },
  {
    value: "Sales",
    label: "Sales",
  },
];

type prop = {
  defaultCourse?: courseEnum[];
  defaultDesignation?: designationEnum;
  defaultEmail?: string;
  defaultGender?: genderEnum;
  defaultImgUpload?: string;
  defaultMobileNo?: string;
  defaultName?: string;
  isEdit: boolean;
  employeeId?: string;
};
