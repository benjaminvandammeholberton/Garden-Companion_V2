import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const LocationForm = () => {
    const formSchema = z.object({
        country: z.string().min(2).max(50),
        post_code: z.string().min(1).max(10),
        city: z.string().min(2).max(50)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "",
            post_code: "",
            city: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

      
    return <div>
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            />
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center w-4/12">
                    <FormLabel>Pays</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="h-8" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="post_code"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center w-4/12">
                    <FormLabel>Code Postal</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="h-8" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center w-4/12">
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="h-8" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
        </Form>
    </div>
}

export default LocationForm