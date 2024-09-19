import { useNavigate } from "react-router-dom";
import Button from "../UI/button";
import Input from "../UI/Input";
import { useState } from "react";

const EmployeeListAction = ({
  totalEmployee,
  search,
  setSearch,
}: {
  totalEmployee: number;
  setSearch: (prop: string) => void;
  search: string;
}) => {
  const [debounceTimeout, setDebounceTimeout] = useState<number | undefined>();
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="w-full flex justify-end px-3">
        <ul className="flex  items-center gap-3 ">
          <li>Total Count: {totalEmployee}</li>
          <li className="min-w-[250px] flex justify-end">
            <Button
              type="button"
              onClickHandler={() => {
                navigate("/employee/create");
              }}
              classNameStyle=""
            >
              Create Employee
            </Button>
          </li>
        </ul>
      </div>

      <div className="w-full flex justify-end px-3">
        <ul className="flex  items-center gap-3 ">
          <li>Search:</li>
          <li className="min-w-[250px]">
            <Input
              name="Search"
              type="text"
              placeholder="Search by name, email, date..."
              onChangeHandler={(e) => {
                if (debounceTimeout) {
                  clearTimeout(debounceTimeout);
                }

                let val = e?.target.value;

                let x = setTimeout(() => {
                  setSearch(val);
                }, 3000);

                setDebounceTimeout(x);
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeListAction;
