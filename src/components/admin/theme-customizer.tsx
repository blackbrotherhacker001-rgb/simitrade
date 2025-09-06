
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Save, Paintbrush } from 'lucide-react';
import Image from 'next/image';

const themeSchema = z.object({
  appName: z.string().min(1, 'App name is required'),
  logo: z.any().optional(),
});

type ThemeFormValues = z.infer<typeof themeSchema>;

export function ThemeCustomizer() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      appName: 'Bicrypto',
      logo: null,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('logo', file);
    }
  };

  const onSubmit = (values: ThemeFormValues) => {
    console.log(values);
    toast({
      title: 'Theme Saved',
      description: 'Your new theme settings have been applied.',
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5"/>
                Theme Customizer
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. CryptoSim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-md border flex items-center justify-center bg-muted/50 overflow-hidden">
                        {logoPreview ? (
                          <Image src={logoPreview} alt="Logo preview" width={64} height={64} className="object-contain" />
                        ) : (
                           <div className="p-2 bg-primary/10 rounded-lg">
                             <Paintbrush className="h-8 w-8 text-primary" />
                           </div>
                        )}
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                        id="logo-upload"
                      />
                       <Button type="button" variant="outline" asChild>
                         <label htmlFor="logo-upload">
                           <Upload className="mr-2 h-4 w-4"/>
                           Upload Logo
                         </label>
                       </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
                <Save className="mr-2 h-4 w-4"/>
                Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
