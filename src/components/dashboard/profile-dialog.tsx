
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { User, Wallet } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type ProfileForm = z.infer<typeof formSchema>;

interface ProfileDialogProps {
  children: React.ReactNode;
}

export function ProfileDialog({ children }: ProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  
  const form = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  function onSubmit(values: ProfileForm) {
    updateUser({ name: values.name });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setOpen(false);
  }

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Profile</DialogTitle>
          <DialogDescription>
            Update your name and view your connected wallet.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><User className="h-4 w-4"/> User Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
                <FormLabel className="flex items-center gap-2"><Wallet className="h-4 w-4"/> Wallet Address</FormLabel>
                <Input value={user.walletAddress} readOnly disabled/>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
