import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// assets
import harvestIcon from "../../../assets/actions-icons/harvest.png";

// components
import FormHeader from "./components/FormHeader";
import InputUserAreas from "./components/InputAreas";

// contexts
import VegetablesContext from "@/contexts/VegetableContext";
import AreasContext from "@/contexts/AreasContext";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { AreaInterface } from "@/interfaces/interfaces";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance, { axiosInstanceFile } from "@/api/axios";

import FieldVegetablesInArea from "./components/FieldVegetablesInArea";

interface HarvestFormInterface {
  onClose: () => void;
}

const HarvestForm: React.FC<HarvestFormInterface> = ({ onClose }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [currentQuantityUnit, setCurrentQuantityUnit] = useState("")
  const { toast } = useToast();


  const vegetablesContext = useContext(VegetablesContext);
  if (!vegetablesContext) {
    throw new Error(
      "VegetablesContext must be used within an VegetablesProvider"
    );
  }

  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas, setAreas } = areasContext;

  const formSchema = z.object({
    vegetable: z.string().min(2).max(50),
    area: z.string(),
    harvest_quantity: z.number().positive(),
    harvest_unit: z.string(),
    date: z.date(),
    note: z.string().max(500).optional(),
    file: z.instanceof(FileList).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vegetable: "",
      area: "",
      harvest_quantity: 0,
      harvest_unit: currentQuantityUnit,
      date: new Date(),
      note: "",
    },
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { file, ...rest } = values;

    const data = {
      ...rest,
      date: rest.date.toISOString().slice(0, 10),
      type: "Fin de culture",
    };

    if (file && file.length > 0) {
      const formData = new FormData();
      formData.append("file", file[0]);
      try {
        const response = await axiosInstanceFile.post("/upload", formData);
        data["photo"] = response.data;
      } catch (error) {
        console.error("Error submitting the file:", error);
      }
    }

    try {
      let selected_area: AreaInterface | undefined;
      await axiosInstance.post("/api/v1/action/", data);
      const updatedArea = areas.filter((area) => (area.area_id = data.area))[0];
      console.log(updatedArea);
      // setAreas((prev) => (

      // ))
      // const newVegetable = response.data;
      // if (newVegetable) {
      //   const newAreas = areas.map((area) => {
      //     if (area.area_id === newVegetable?.area) {
      //       selected_area = area;
      //       return {
      //         ...area,
      //         vegetables: [...(area.vegetables || []), newVegetable],
      //       };
      //     }
      //     return area;
      //   });
      //   setAreas(newAreas);
      //   toast({
      //     title: "Fn de culture enregistrée 👍",
      //     description: `de votre espace: ${selected_area?.name ?? ""}`,
      //   });
      // }
      // onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-4/5">
      <Form {...form}>
        <FormHeader icon={harvestIcon} name="Récolter" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="area"
            render={() => (
              <InputUserAreas
                setInput={(value) => {
                  form.setValue("area", value);
                  setSelectedArea(value);
                }}
              />
            )}
          />
          <FieldVegetablesInArea form={form} selectedArea={selectedArea} setCurrentQuantityUnit={setCurrentQuantityUnit}  />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="harvest_quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-4/12">
                  <FormLabel>Quantité</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-8" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harvest_unit"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-3/6">
                  <FormLabel>Unité</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gramme, unité, ..."
                      type="text"
                      {...field}
                      value={currentQuantityUnit !== "" ? currentQuantityUnit : field.value}
                      className="h-8"
                      disabled={currentQuantityUnit != ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal border-slate-700",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value &&
                          format(field.value, "PPP", { locale: fr })}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    className="w-full p-2 border rounded"
                    placeholder="Ajoutez une note..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={() => {
              return (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fileRef}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Fin de culture</Button>
        </form>
      </Form>
    </div>
  );
};

export default HarvestForm;
