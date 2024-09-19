import { IoIosArrowDown } from "react-icons/io";
import { sortOrderDto } from "../employee-list/EmployeeListTable";

const SortOrderIcon = ({
  order,
  setOrder,
  name,
  setOrderBy,
  sortBy,
}: {
  sortBy: string;
  order: sortOrderDto;
  name: string;
  setOrderBy: Function;
  setOrder: Function;
}) => {
  return (
    <IoIosArrowDown
      onClick={() => {
        console.log(name);
        setOrderBy(name);
        setOrder(order == "asc" && name == sortBy ? "desc" : "asc");
      }}
      className={` ${
        order == "desc" && name == sortBy ? "rotate-180" : "rotate-0"
      } cursor-pointer`}
    />
  );
};

export default SortOrderIcon;
