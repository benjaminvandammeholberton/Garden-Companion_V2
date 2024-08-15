import { useState } from "react";
import ModuleHeader from "../features/dashboard-modules/ModuleHeader";
import ActionsModule from "../features/dashboard-modules/actions/ActionsModule";
import AreasModule from "../features/dashboard-modules/areas/components/AreasModule";
// import dashboardModulesList from "../features/dashboard-modules/dashboardModulesList";
import Forecast from "../features/dashboard-modules/forecast/Forecast";
import Recommandations from "../features/dashboard-modules/recommandations/Recommandations";
import SeedlingsModule from "../features/dashboard-modules/seedlings/SeedlingsModule";
import ToDoListModule from "../features/dashboard-modules/todo-list/components/ToDoListModule";
import useGetAreas from "../hooks/useGetAreas";

const Dashboard = () => {
  const [areas, isLoadingAreas, errorGetAreas, setAreas] = useGetAreas();
  const [isDeployArea, SetIsDeployArea] = useState(false);
  const [isDeployAction, SetIsDeployAction] = useState(false);
  const [isDeploySeedling, SetIsDeploySeedling] = useState(false);
  const [isDeployToDoList, SetIsDeployToDoList] = useState(false);
  const [isDeployForecast, SetIsDeployForecast] = useState(false);
  const [isDeployRecommandations, SetIsDeployRecommandations] = useState(false);
  const onTitleClick = (module: string) => {
    switch (module) {
      case "area":
        SetIsDeployArea(!isDeployArea);
        break;
      case "action":
        SetIsDeployAction(!isDeployAction);
        break;
      case "seedlings":
        SetIsDeploySeedling(!isDeploySeedling);
        break;
      case "todo":
        SetIsDeployToDoList(!isDeployToDoList);
        break;
      case "forecast":
        SetIsDeployForecast(!isDeployForecast);
        break;
      case "recommandations":
        SetIsDeployRecommandations(!isDeployRecommandations);
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
        <div
          className={`
              ${isDeployArea ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
          onClick={() => onTitleClick("area")}
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Zones de Culture"} />
            {isDeployArea && (
              <AreasModule
                {...{ areas, isLoadingAreas, errorGetAreas, setAreas }}
              />
            )}
          </div>
        </div>
        <div
          className={`
              ${isDeployAction ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
          onClick={() => onTitleClick("action")}
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Nouvelle action"} />
            <ActionsModule />
          </div>
        </div>
        <div
          className={`
              ${isDeploySeedling ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Mes semis en pot"} />
            <SeedlingsModule />
          </div>
        </div>
        <div
          className={`
              ${isDeployToDoList ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Liste de tâches"} />
            <ToDoListModule />
          </div>
        </div>
        <div
          className={`
              ${isDeployForecast ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Prévisions météo"} />
            <Forecast />
          </div>
        </div>
        <div
          className={`
              ${isDeployRecommandations ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Prêt à semer !"} />
            <Recommandations />
          </div>
        </div>

        {/* {dashboardModulesList.map((module) => {
          return (
            <div
              key={module.id}
              classN{ame=`
              ${isDeploy ? "h-[350px]" : "h-[120px]"}
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              `}
            >
              <div className="relative w-full h-full overflow-hidden">
                <ModuleHeader title={module.title} />
                <module.component />
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Dashboard;
