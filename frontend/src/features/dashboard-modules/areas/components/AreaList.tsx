// hooks
import { useContext } from "react";

// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// interfaces
import { AreaInterface } from "../../../../interfaces/interfaces";

// components
import AreaListItem from "./AreaListItem";
import AreasContext from "@/contexts/AreasContext";

// ui
import { Skeleton } from "@/components/ui/skeleton";

interface AreaListProps {
  sortedBy: string;
  openModal: (id: string) => void;
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

  return (
    <div className="overflow-y-scroll overflow-x-hidden  h-[285px] my-2 pr-2 mx-2 font-thin text-xl">
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
