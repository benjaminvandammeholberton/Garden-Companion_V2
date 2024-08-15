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
  console.log(areas);
  return (
    <div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
        <div
          className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Zones de Culture"} />
            <AreasModule
              {...{ areas, isLoadingAreas, errorGetAreas, setAreas }}
            />
          </div>
        </div>
        <div
          className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Nouvelle action"} />
            <ActionsModule />
          </div>
        </div>
        <div
          className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Mes semis en pot"} />
            <SeedlingsModule />
          </div>
        </div>
        <div
          className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Liste de tâches"} />
            <ToDoListModule />
          </div>
        </div>
        <div
          className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
        >
          <div className="relative w-full h-full overflow-hidden">
            <ModuleHeader title={"Prévisions météo"} />
            <Forecast />
          </div>
        </div>
        <div
          className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
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
              className="
              h-[350px]
              w-[370px]
              bg-white
              opacity-90
              rounded-3xl
              "
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
