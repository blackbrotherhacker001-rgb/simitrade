
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
import { Upload, Save, Type } from 'lucide-react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';

const contentSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
  marketCardImage: z.any().optional(),
});

type ContentFormValues = z.infer<typeof contentSchema>;

export function ContentManager() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      headline: 'Trade Crypto like a pro',
      subheadline: 'Advanced trading tools, lightning-fast execution, and unmatched security. Join millions of traders worldwide.',
      marketCardImage: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('marketCardImage', file);
    }
  };

  const onSubmit = (values: ContentFormValues) => {
    console.log(values);
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
