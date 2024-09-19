const PaginationComponent = ({
  page,
  rows,
  total,
  handelPagination,
}: {
  total: number;
  page: number;
  rows: number;
  handelPagination: (prop: number) => void;
}) => {
  const totalPage = Math.ceil(total / rows);

  let arr = new Array(totalPage).fill(1);

  return (
    <div className="flex gap-3 p-3 w-full justify-end">
      {arr?.map((_, i) => (
        <span
          onClick={() => {
            handelPagination(i + 1);
          }}
          className={`w-[30px] border flex items-center justify-center flex-shrink-0 h-[30px] rounded-full ${i+1 == page && "bg-gray-700 text-white" } shadow-md`}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
};

export default PaginationComponent;
