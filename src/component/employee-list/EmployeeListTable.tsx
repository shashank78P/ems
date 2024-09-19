import { Link } from "react-router-dom";
import SortOrderIcon from "../common/SortOrderIcon";

const TableBody = ({
  data,
  setSortBy,
  setSortOrder,
  sortBy,
  sortOrder,
  handleDelete
}: TableBodyProp) => {


  return (
    <table className="w-full table-auto">
      <tr className="text-start h-[50px]">
        <th className="border p-1 text-start ">
          <span className="flex px-2">
            <span className="flex-1">Unique Id</span>
            <SortOrderIcon
              setOrder={setSortOrder}
              name="_id"
              setOrderBy={setSortBy}
              sortBy={sortBy}
              order={sortOrder}
            />
          </span>
        </th>

        <th className="border p-1 text-start">Image</th>
        <th className="border p-1 text-start ">
          <span className="flex px-2">
            <span className="flex-1">Name</span>
            <SortOrderIcon
              setOrder={setSortOrder}
              name="name"
              setOrderBy={setSortBy}
              sortBy={sortBy}
              order={sortOrder}
            />
          </span>
        </th>
        <th className="border p-1 text-start ">
          <span className="flex px-2">
            <span className="flex-1">Email</span>
            <SortOrderIcon
              setOrder={setSortOrder}
              name="email"
              setOrderBy={setSortBy}
              sortBy={sortBy}
              order={sortOrder}
            />
          </span>
        </th>
        <th className="border p-1 text-start">Mobile No.</th>
        <th className="border p-1 text-start">Designation</th>
        <th className="border p-1 text-start">Gender</th>
        <th className="border p-1 text-start">Course</th>
        <th className="border p-1 text-start">
          <span className="flex px-2">
            <span className="flex-1">Created At</span>
            <SortOrderIcon
              setOrder={setSortOrder}
              name="createdAt"
              setOrderBy={setSortBy}
              sortBy={sortBy}
              order={sortOrder}
            />
          </span>
        </th>
        <th className="border p-1"> Action</th>
      </tr>

      {data?.map((employee) => {
        let url = employee?.imageUrl;
        url = url.replace("public/", "");
        return (
          <tr className=" h-[50px]" key={employee?._id}>
            <td className=" border p-1">{employee?._id}</td>
            <td className=" border p-1">
              <img
                src={`${import.meta.env.VITE_API_URL?.replace(
                  "/api",
                  ""
                )}/${url}`}
                className="w-[40px] h-[40px] rounded-full border"
                alt=""
                loading="lazy"
              />
            </td>
            <td className=" border p-1 ">{employee?.name}</td>
            <td className=" border p-1">{employee?.email}</td>
            <td className=" border p-1">{employee?.mobileNumber}</td>
            <td className=" border p-1">{employee?.designation}</td>
            <td className=" border p-1">
              {employee?.gender == "M" ? "Male" : "Female"}
            </td>
            <td className=" border p-1">{employee?.course}</td>
            <td className=" border p-1">
              {employee?.createdAt?.replace("T", "")?.substring(0, 10)}
            </td>
            <td className=" border text-center p-1 space-x-1">
              <Link to={`/employee/${employee?._id}`}>Edit</Link>
              <span>-</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleDelete(employee._id);
                }}
              >
                Delete
              </span>
            </td>
          </tr>
        );
      })}
      <tr></tr>
    </table>
  );
};

export default TableBody;

type TableBodyProp = {
  sortBy: sortByDto;
  setSortBy: React.Dispatch<React.SetStateAction<sortByDto>>;
  sortOrder: sortOrderDto;
  setSortOrder: React.Dispatch<React.SetStateAction<sortOrderDto>>;
  data: employeeDto[];
  handleDelete : (prop : any ) => void ;
};

export type sortByDto = "name" | "email" | "_id" | "createdAt";
export type sortOrderDto = "asc" | "desc";

export interface employeeDto {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  gender: genderEnum;
  designation: designationEnum;
  course: courseEnum;
  imageUrl: string;
  createdAt: string;
  status: status;
}

export enum genderEnum {
  M = "M",
  F = "F",
}

export enum courseEnum {
  MCA = "MCA",
  BCA = "BCA",
  BSC = "BSC",
}

export enum designationEnum {
  Manager = "Manager",
  Developer = "Developer",
}

export enum status {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}
