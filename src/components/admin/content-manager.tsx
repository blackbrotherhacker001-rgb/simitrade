
'use client';

import { useState, useEffect } from 'react';
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
import { Upload, Save, Type } from 'lucide-react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { useTheme } from '@/hooks/use-theme';

const contentSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
  marketCardImage: z.any().optional(),
});

type ContentFormValues = z.infer<typeof contentSchema>;

export function ContentManager() {
  const { theme, setTheme } = useTheme();
  const [imagePreview, setImagePreview] = useState<string | null>(theme.landingMarketCardImage);
  const { toast } = useToast();

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      headline: '',
      subheadline: '',
      marketCardImage: null,
    },
  });

  useEffect(() => {
    form.setValue('headline', theme.landingHeadline.replace(/<br \/>/g, '').replace(/<span class="text-primary">/g, '').replace(/<\/span>/g, ''));
    form.setValue('subheadline', theme.landingSubheadline);
    setImagePreview(theme.landingMarketCardImage);
  }, [theme, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue('marketCardImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: ContentFormValues) => {
    setTheme({
      landingHeadline: values.headline,
      landingSubheadline: values.subheadline,
      landingMarketCardImage: (values.marketCardImage as string | null) || theme.landingMarketCardImage,
    });
    toast({
      title: 'Content Saved',
      description: 'Your new content has been saved and is now live.',
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Type className="h-5 w-5"/>
              Content Management
            </CardTitle>
            <CardDescription>
              Edit the text and images for the main landing page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Trade Crypto like a pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subheadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-headline</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the sub-headline..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketCardImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Card Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div className="w-40 h-24 rounded-md border flex items-center justify-center bg-muted/50 overflow-hidden">
                        {imagePreview ? (
                          <Image src={imagePreview} alt="Image preview" width={160} height={96} className="object-cover" />
                        ) : (
                           <Image src="https://placehold.co/600x400/0B0B0D/FFF?text=Market" alt="Placeholder" width={160} height={96} className="object-cover" />
                        )}
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                       <Button type="button" variant="outline" asChild>
                         <label htmlFor="image-upload">
                           <Upload className="mr-2 h-4 w-4"/>
                           Upload Image
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
                Save & Publish
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
