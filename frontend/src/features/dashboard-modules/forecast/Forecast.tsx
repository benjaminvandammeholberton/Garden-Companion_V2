import { useState } from "react";
import ForecastDailyItem from "./components/ForecastdailyItem";
import SkeletonForecast from "./components/SkeletonForecast";
import useGetForecast from "./useGetForecast";
import LocationForm from "./components/LocationForm";

const Forecast = () => {
  // const [foreacastData, isLoading, error] = useGetForecast();
  const [userLocation, setUserLocation] = useState<string | null>("");

  const location = localStorage.getItem("location")
  console.log(userLocation)
  if (location) {
    setUserLocation(location)
  }

  return (
    <div>
      {!userLocation ? (
        <LocationForm />
      ) : (
        <>
          {/* {isLoading && <SkeletonForecast />}
          {error && <p>error</p>}
          {!isLoading && (
            <ul className="gap-2 flex flex-col text-xl font-thin overflow-y-scroll p-2">
              {foreacastData.map((dailyForecast, index) => (
                <ForecastDailyItem key={index} dailyForecast={dailyForecast} />
              ))}
            </ul>
          )} */}
        </>
      )}
    </div>
  );
};
export default Forecast;
