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
import { Card, CardContent } from "@/components/ui/card";

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
        <Card className="h-[350px] w-[370px]">
          <div
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => onTitleClick("area")}
          >
            <ModuleHeader title={"Zones de Culture"} />
            <CardContent>
              <AreasModule
                {...{ areas, isLoadingAreas, errorGetAreas, setAreas }}
              />
            </CardContent>
          </div>
        </Card>
        <Card className="h-[350px] w-[370px]">
          <div
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => onTitleClick("action")}
          >
            <ModuleHeader title={"Nouvelle action"} />
            <CardContent>
              <ActionsModule />
            </CardContent>
          </div>
        </Card>
        <Card className="h-[350px] w-[370px]">
          <div
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => onTitleClick("seedlings")}
          >
            <ModuleHeader title={"Mes semis en pot"} />
            <CardContent>
              <SeedlingsModule />
            </CardContent>
          </div>
        </Card>
        <Card className="h-[350px] w-[370px]">
          <div
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => onTitleClick("todo")}
          >
            <ModuleHeader title={"Liste de tâches"} />
            <CardContent>
              <ToDoListModule />
            </CardContent>
          </div>
        </Card>
        <Card className="h-[350px] w-[370px]">
          <div
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => onTitleClick("forecast")}
          >
            <ModuleHeader title={"Prévisions météo"} />
            <CardContent>
              <Forecast />
            </CardContent>
          </div>
        </Card>
        <Card className="h-[350px] w-[370px]">
          <div
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => onTitleClick("recommandations")}
          >
            <ModuleHeader title={"Prêt à semer !"} />
            <CardContent>
              <Recommandations />
            </CardContent>
          </div>
        </Card>

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
