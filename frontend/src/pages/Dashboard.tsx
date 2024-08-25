// components
import Forecast from "../features/dashboard-modules/forecast/Forecast";
import Recommandations from "../features/dashboard-modules/recommandations/Recommandations";
import SeedlingsModule from "../features/dashboard-modules/seedlings/SeedlingsModule";
import ToDoListModule from "../features/dashboard-modules/todo-list/components/ToDoListModule";
import ModuleHeader from "../features/dashboard-modules/ModuleHeader";
import ActionsModule from "../features/dashboard-modules/actions/ActionsModule";
import AreasModule from "../features/dashboard-modules/areas/components/AreasModule";

// hook
import useGetAreas from "../hooks/useGetAreas";

// shadcn ui
import { Card, CardContent } from "@/components/ui/card";
import { AreasProvider } from "@/contexts/AreasContext";

const Dashboard = () => {
  const [areas, isLoadingAreas, errorGetAreas, setAreas] = useGetAreas();

  return (
    <AreasProvider>
      <div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
          <Card className="h-[350px] w-[370px] relative overflow-hidden">
            <ModuleHeader title={"Zones de Culture"} />
            <CardContent>
              <AreasModule
                {...{ areas, isLoadingAreas, errorGetAreas, setAreas }}
              />
            </CardContent>
          </Card>
          <Card className="h-[350px] w-[370px] relative overflow-hidden">
            <ModuleHeader title={"Nouvelle action"} />
            <CardContent>
              <ActionsModule />
            </CardContent>
          </Card>
          <Card className="h-[350px] w-[370px] relative overflow-hidden">
            <ModuleHeader title={"Semis en pot"} />
            <CardContent className="">
              <SeedlingsModule />
            </CardContent>
          </Card>
          <Card className="h-[350px] w-[370px] relative overflow-hidden">
            <ModuleHeader title={"Liste de tâches"} />
            <CardContent>
              <ToDoListModule />
            </CardContent>
          </Card>
          <Card className="h-[350px] w-[370px] relative overflow-hidden">
            <ModuleHeader title={"Prévisions météo"} />
            <CardContent>
              <Forecast />
            </CardContent>
          </Card>
          <Card className="h-[350px] w-[370px] relative overflow-hidden">
            <ModuleHeader title={"Prêt à semer !"} />
            <CardContent>
              <Recommandations />
            </CardContent>
          </Card>
        </div>
      </div>
    </AreasProvider>
  );
};

export default Dashboard;
