import { useEffect } from "react";
import EmployeeForm from "../../../component/employee-form";
import useFetchHook from "../../../hooks/useFetchHook";
import { useParams } from "react-router-dom";
import { designationEnum } from "../../../component/employee-list/EmployeeListTable";

const UpdateEmployee = () => {
  const { id } = useParams();
  const { data, error, handleFetch, loading, message } = useFetchHook({
    isJsonContentType: true,
  });

  useEffect(() => {
    handleFetch({ method: "GET", url: `employee/get/${id}` });
  }, []);

  return (
    <div className="mb-6">
      <div className="border p-3 text-lg mb-3">Create Employee</div>
      <div className="max-w-[700px] mx-auto border p-6 rounded-md">
        <EmployeeForm isEdit={true} 
        defaultCourse={data?._data?.course}
        defaultDesignation={data?._data?.designation as designationEnum}
        defaultEmail={data?._data?.email}
        defaultGender={data?._data?.gender}
        defaultImgUpload={data?.data?.imageUrl}
        defaultMobileNo={data?._data?.mobileNumber}
        defaultName={data?._data?.name}
        employeeId={data?._data?._id}
        />
      </div>
    </div>
  );
};

export default UpdateEmployee;
