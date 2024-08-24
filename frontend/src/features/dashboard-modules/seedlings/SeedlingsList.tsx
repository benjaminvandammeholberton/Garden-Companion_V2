import carrot from "../../../assets/landing/icons/carrot.png";

import tomato from "../../../assets/landing/icons/tomato.png";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const testData = [
  {
    name: "Carotte",
    variety: "Nantaise",
    sowingDate: new Date(),
    icon: carrot,
  },
  {
    name: "Carotte",
    variety: "Yellowstone",
    sowingDate: new Date(),
    icon: carrot,
  },
  {
    name: "Tomate",
    variety: "Ananas",
    sowingDate: new Date(),
    icon: tomato,
  },
  {
    name: "Tomate",
    variety: "Coeur de Boeuf",
    sowingDate: new Date(),
    icon: tomato,
  },
  {
    name: "Carotte",
    variety: "Nantaise",
    sowingDate: new Date(),
    icon: carrot,
  },
  {
    name: "Carotte",
    variety: "Yellowstone",
    sowingDate: new Date(),
    icon: carrot,
  },
  {
    name: "Tomate",
    variety: "Ananas",
    sowingDate: new Date(),
    icon: tomato,
  },
  {
    name: "Tomate",
    variety: "Coeur de Boeuf",
    sowingDate: new Date(),
    icon: tomato,
  },
  {
    name: "Carotte",
    variety: "Nantaise",
    sowingDate: new Date(),
    icon: carrot,
  },
  {
    name: "Carotte",
    variety: "Yellowstone",
    sowingDate: new Date(),
    icon: carrot,
  },
  {
    name: "Tomate",
    variety: "Ananas",
    sowingDate: new Date(),
    icon: tomato,
  },
  {
    name: "Tomate",
    variety: "Coeur de Boeuf",
    sowingDate: new Date(),
    icon: tomato,
  },
];

const SeedlingsList = () => {
  return (
    <div className="overflow-scroll">
      <ul className="text-lg font-thin h-5/6 p-2 cursor-default">
        {testData.map((vegetable) => {
          return (
            <li className="flex gap-3 w-full justify-between items-center">
              <div className="flex gap-3">
                <img className="w-5 h-5" src={vegetable.icon} alt="" />
                <span>
                  {vegetable.name} - {vegetable.variety}
                </span>
              </div>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>4 sem</TooltipTrigger>
                  <TooltipContent>
                    <p>Semé le {vegetable.sowingDate.toDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SeedlingsList;
