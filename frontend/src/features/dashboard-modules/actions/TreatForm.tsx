import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// assets
import treatingIcon from "../../../assets/actions-icons/parasite.png";

// components
import FormHeader from "./components/FormHeader";
import InputUserAreas from "./components/InputAreas";

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

import { Textarea } from "@/components/ui/textarea";
import axiosInstance, { axiosInstanceFile } from "@/api/axios";

import FieldVegetablesInArea from "./components/FieldVegetablesInArea";
import { useState } from "react";

interface WeedFormInterface {
  onClose: () => void;
}

const WeedForm: React.FC<WeedFormInterface> = ({ onClose }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const { toast } = useToast();

  const formSchema = z.object({
    vegetable: z.string().max(50).nullable().optional(),
    area: z.string().min(1),
    treatment_name: z.string().min(1),
    treatment_quantity: z.coerce.number().gte(0).optional(),
    treatment_unit: z.string().optional(),
    date: z.date(),
    note: z.string().max(500).optional(),
    file: z.instanceof(FileList).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vegetable: null,
      area: "",
      treatment_name: "",
      treatment_quantity: 0,
      treatment_unit: "",
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
      type: "Traiter",
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
      await axiosInstance.post("/api/v1/action/", data);
      toast({
        title: "Traitement enregistré 👍",
        description: ``,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-4/5">
      <Form {...form}>
        <FormHeader icon={treatingIcon} name="Traiter" />
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
          <FieldVegetablesInArea form={form} selectedArea={selectedArea} />
          <FormField
            control={form.control}
            name="treatment_name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Nom du traitement utilisé</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex : Anti-limaces"
                    {...field}
                    className="h-8"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="treatment_quantity"
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
              name="treatment_unit"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-3/6">
                  <FormLabel>Unité</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="litres, kg, ..."
                      type="text"
                      {...field}
                      value={field.value}
                      className="h-8"
                    />
                  </FormControl>
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
          <Button type="submit">Traiter</Button>
        </form>
      </Form>
    </div>
  );
};

export default WeedForm;
