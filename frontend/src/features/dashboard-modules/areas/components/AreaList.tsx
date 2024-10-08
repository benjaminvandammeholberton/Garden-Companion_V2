// hooks
import { useContext, useEffect } from "react";

// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// interfaces
import { AreaInterface } from "../../../../interfaces/interfaces";

// components
import AreaListItem from "./AreaListItem";
import AreasContext from "@/contexts/AreasContext";

// ui
import { Skeleton } from "@/components/ui/skeleton";
import { CirclePlus } from "lucide-react";

interface AreaListProps {
  sortedBy: string;
  openModal: (area: AreaInterface) => void;
}

const AreaList: React.FC<AreaListProps> = ({ sortedBy, openModal }) => {
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, isLoading } = areasContext;
  const environnements = ["greenhouse", "outdoor", "indoor"];

  // function to get the right area icon based of the environnement
  const getAreaIcon = (env: string) => {
    let areaIcon: string | undefined;
    if (env === "indoor") areaIcon = indoor;
    if (env === "greenhouse") areaIcon = greenhouse;
    if (env === "outdoor") areaIcon = outdoor;
    return areaIcon;
  };

  if (areas.length === 0) {
    return (
      <div className="text-lg w-full mx-auto text-center flex items-center mt-5 leading-8">
        <span>
          {" "}
          Pour commencer, créez une zone de culture en cliquant sur{" "}
          <CirclePlus className="inline" size={"25"} strokeWidth={1.5} />
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden h-[280px] px-2 font-thin text-xl scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-[290px] h-[25px] rounded-full bg-gradient-to-r from-blue-50 to-blue-100"
            />
          ))}
        </div>
      ) : sortedBy === "environnement" ? (
        <ul className=" space-y-4">
          {environnements.map((env, index) => {
            const areasOfType: AreaInterface[] = areas.filter(
              (area: AreaInterface) => area.environnement === env
            );
            const sortedAreasOfType = areasOfType.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            return (
              <div key={index}>
                {sortedAreasOfType.map((area) => {
                  return (
                    <AreaListItem
                      key={area.area_id}
                      area={area}
                      openModal={openModal}
                      areaIcon={getAreaIcon(area.environnement)}
                    />
                  );
                })}
              </div>
            );
          })}
        </ul>
      ) : (
        <ul>
          {areas
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((area: AreaInterface, index: number) => {
              if (area)
                return (
                  <AreaListItem
                    key={index}
                    area={area}
                    openModal={openModal}
                    areaIcon={getAreaIcon(area.environnement)}
                  />
                );
            })}
        </ul>
      )}
    </div>
  );
};

export default AreaList;
