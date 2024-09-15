import FakeVegetableData from "@/dumb-data/vegetablesData";
import { columns, Vegetable } from "@/features/data-table/columns";
import { DataTable } from "@/features/data-table/data-table";

const TableProduction = () => {
  const fetchVegetable = (): Vegetable[] => {
    return FakeVegetableData;
  };
  const data = fetchVegetable();

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TableProduction;
