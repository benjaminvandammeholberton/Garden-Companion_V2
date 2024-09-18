// assets
import vegetableIconsMaps from "../../../../maps/vegetableMaps";
import unknownVegetableIcon from "../../../../assets/vegetables-icons/unknown-vegetable.png";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AreasContext from "@/contexts/AreasContext";
import { useContext, useEffect, useState } from "react";

interface FieldVegetablesInAreasInterface {
  setInput: (value: string) => void;
  defaultValue?: string;
}

const FieldVegetablesInAreas: React.FC<FieldVegetablesInAreasInterface> = ({
  form,
  selectedArea,
}) => {
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, setAreas } = areasContext;
  const [vegetableInAreas, setVegetableInAreast] = useState([]);
  useEffect(() => {
    if (selectedArea) {
      const vegetables = areas.filter(
        (area) => area.area_id === selectedArea
      )[0].vegetables;
      setVegetableInAreast(vegetables);
    }
  }, [selectedArea, areas]);

  const getVegetableAsset = (vegetableName) => {
    if (vegetableName) {
      return (
        (
          vegetableIconsMaps.filter((vegetable) => {
            return vegetable.name.fr === vegetableName.toLowerCase();
          })[0] || {}
        ).assets || unknownVegetableIcon
      );
    }
  };

  return (
    <FormField
      control={form.control}
      name="vegetable"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center w-full">
          <FormLabel>Sélectionner votre plante</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border-slate-700 h-9">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {vegetableInAreas.map((vegetable) => {
                if (!vegetable.remove_date) {
                  return (
                    <SelectItem
                      key={vegetable.vegetable_manager_id}
                      value={vegetable.vegetable_manager_id}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={getVegetableAsset(vegetable.name)}
                          alt=""
                          className="w-6"
                        />
                        {vegetable.name} - {vegetable.variety}
                      </div>
                    </SelectItem>
                  );
                }
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default FieldVegetablesInAreas;
