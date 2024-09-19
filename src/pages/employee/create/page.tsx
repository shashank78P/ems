import EmployeeForm from "../../../component/employee-form";

const CreateEmployee = () => {
  return (
    <div className="mb-6">
      <div className="border p-3 text-lg mb-3">Create Employee</div>
      <div className="max-w-[700px] mx-auto border p-6 rounded-md">
        <EmployeeForm isEdit={false} />
      </div>
    </div>
  );
};

export default CreateEmployee;
