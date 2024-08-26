import { useEffect, useState } from "react";

// assets
import vegetableIconsMaps from "@/maps/vegetableMaps";
import unknowVegetable from "../../../assets/vegetables-icons/unknown-vegetable.png"

// ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// interfaces
import { SeedlingInterface } from "@/interfaces/interfaces";

// api
import { getAllSeedlings } from "@/api/api-services/seedlingsApi";

// utils
import capitalize from "@/utils/capitalizeStr";

interface SeedlingsListProps {
  sortedBy: string;
  handleClickSort: (type: string) => void;
}

const SeedlingsList: React.FC<SeedlingsListProps> = () => {
  const [seedlings, setSeedlings] = useState<SeedlingInterface[]>([]);

  useEffect(() => {
    const fetchSeedlings = async () => {
      try {
        const data = await getAllSeedlings();
        console.log(data);
        setSeedlings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeedlings();
  }, []);

  const vegetableIcon = (vegetableName: string) => {
    const icon = vegetableIconsMaps.find(
      (asset) => asset.name.fr === vegetableName.toLowerCase()
    );
    if (icon) {
      return icon.assets;
    }
    return unknowVegetable;
  };

  return (
    <div className="h-[280px] overflow-scroll">
      <ul className="text-lg font-thin h-5/6 p-2 cursor-default">
        {seedlings.map((vegetable) => {
          return (
            <li
              className="flex gap-3 w-full justify-between items-center"
              key={vegetable.seedling_id}
            >
              <div className="flex gap-3">
                <img
                  className="w-5 h-5"
                  src={vegetableIcon(vegetable.name)}
                  alt=""
                />
                <span>
                  {capitalize(vegetable.name)} - {capitalize(vegetable.variety)}
                </span>
              </div>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>4 sem</TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Semé le {new Date(vegetable.created_at).toDateString()}
                    </p>
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
