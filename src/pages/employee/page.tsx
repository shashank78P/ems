import { useCallback, useEffect, useState } from "react";
import EmployeeListAction from "../../component/employee-list/EmployeeListAction";
import EmployeeListTable, {
  sortByDto,
  sortOrderDto,
} from "../../component/employee-list/EmployeeListTable";
import useFetchHook from "../../hooks/useFetchHook";
import PaginationComponent from "../../component/employee-list/PaginationComponent";
import { toast } from "react-toastify";

const EmployeeListPage = () => {
  const rows = 10;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<sortByDto>("createdAt");
  const [sortOrder, setSortOrder] = useState<sortOrderDto>("asc");

  const { data, handleFetch } = useFetchHook({
    isJsonContentType: true,
  });

  const fetchEmployeeData = useCallback(() => {
    handleFetch({
      method: "GET",
      url: `/employee/get-all?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${rows}&search=${search}`,
    });
  }, [sortBy, sortOrder, page, rows, search]);

  useEffect(() => {
    fetchEmployeeData();
  }, [sortBy, sortOrder, page, rows]);

  const {
    data: deleteRes,
    error,
    handleFetch: handelDelete,
  } = useFetchHook({ isJsonContentType: true });

  useEffect(() => {
    if (error) {
      toast.error("Failed to delete employee!.");
    } else if (deleteRes?._success) {
      toast.success("Employee deleted successfully!.");
      fetchEmployeeData();
    }
  }, [deleteRes, error]);

  return (
    <div className="w-full ">
      <div className="border p-3 text-lg mb-3">Employee List</div>

      <div className=" text-base">
        <EmployeeListAction
          totalEmployee={data?._data?.total ?? 0}
          search={search}
          setSearch={setSearch}
        />
        <div className="w-full overflow-x-auto customScrollBar px-3">
          <EmployeeListTable
            data={data?._data?.employees}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleDelete={(id: string) =>
              handelDelete({
                method: "DELETE",
                url: `employee/delete/${id}`,
                body: JSON.stringify({ _id: id }),
              })
            }
          />
        </div>
        <PaginationComponent
          page={page}
          rows={rows}
          total={data?._data?.total ?? 0}
          handelPagination={setPage}
        />
      </div>
    </div>
  );
};

export default EmployeeListPage;
