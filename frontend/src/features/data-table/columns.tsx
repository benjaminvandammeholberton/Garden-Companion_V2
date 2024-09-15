import { ColumnDef } from "@tanstack/react-table";

export type Vegetable = {
  vegetable_manager_id: string;
  name: string;
  variety: string;
  quantity: number;
  quantity_unit: string;
  sowing_date: Date | null;
  planting_date: Date | null;
  ready_to_harvest: boolean;
  quantity_harvested: number | null;
  harvest_unit: string | null;
  remove_date: Date | null;
};

export const columns: ColumnDef<Vegetable>[] = [
  {
    accessorKey: "name",
    header: () => <div className="">Nom</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "variety",
    header: () => <div className="">Variété</div>,
    cell: ({ row }) => {
      return (
        <div className=" whitespace-nowrap">{row.getValue("variety")}</div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="">Quantité</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("quantity")}</div>;
    },
  },
  {
    accessorKey: "quantity_unit",
    header: () => <div className="">Unité</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("quantity_unit")}</div>;
    },
  },
  {
    accessorKey: "sowing_date",
    header: () => <div className="">Semis</div>,
    cell: ({ row }) => {
      const sowingDate = row.getValue("sowing_date");
      const formatted =
        sowingDate instanceof Date && !isNaN(sowingDate.getTime())
          ? sowingDate.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "-";
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "planting_date",
    header: () => <div className="">Plantation</div>,
    cell: ({ row }) => {
      const plantingDate = row.getValue("planting_date");
      const formatted =
        plantingDate instanceof Date && !isNaN(plantingDate.getTime())
          ? plantingDate.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "-";
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "ready_to_harvest",
    header: () => <div className="">À récolter</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("ready_to_harvest")}</div>;
    },
  },
  {
    accessorKey: "quantity_harvested",
    header: () => <div className="">Quantité récoltée</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("quantity_harvested")}</div>;
    },
  },
  {
    accessorKey: "harvest_unit",
    header: () => <div className="">Quantité récoltée</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("harvest_unit")}</div>;
    },
  },
  {
    accessorKey: "remove_date",
    header: () => <div className="">Fin de culture</div>,
    cell: ({ row }) => {
      const removeDate = row.getValue("remove_date");
      const formatted =
        removeDate instanceof Date && !isNaN(removeDate.getTime())
          ? removeDate.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "-";
      return <div className="">{formatted}</div>;
    },
  },
];
