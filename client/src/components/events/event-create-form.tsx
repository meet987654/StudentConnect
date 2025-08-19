import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { insertEventSchema } from "@shared/schema";

const eventFormSchema = insertEventSchema.extend({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

type EventFormData = z.infer<typeof eventFormSchema>;

interface EventCreateFormProps {
  onSubmit: (data: EventFormData) => void;
}

export function EventCreateForm({ onSubmit }: EventCreateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      eventType: "meetup",
      isFeatured: false,
    },
  });

  const watchEventType = watch("eventType");

  const handleFormSubmit = (data: EventFormData) => {
    // Convert date and time strings to Date objects
    const eventData = {
      ...data,
      date: new Date(`${data.date}T${data.startTime}`),
      startTime: new Date(`${data.date}T${data.startTime}`),
      endTime: new Date(`${data.date}T${data.endTime}`),
    };
    onSubmit(eventData as any);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter event title"
            data-testid="input-event-title"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Input
            id="shortDescription"
            {...register("shortDescription")}
            placeholder="Brief description for previews"
            data-testid="input-event-short-description"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="description">Full Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Detailed event description"
            className="min-h-[100px]"
            data-testid="textarea-event-description"
          />
        </div>

        <div>
          <Label htmlFor="eventType">Event Type</Label>
          <Select
            onValueChange={(value) => setValue("eventType", value)}
            defaultValue="meetup"
          >
            <SelectTrigger data-testid="select-event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="meetup">Meetup</SelectItem>
              <SelectItem value="office_hours">Office Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="Event location"
            data-testid="input-event-location"
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            {...register("date")}
            data-testid="input-event-date"
          />
          {errors.date && (
            <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            {...register("startTime")}
            data-testid="input-event-start-time"
          />
          {errors.startTime && (
            <p className="text-sm text-red-600 mt-1">{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            {...register("endTime")}
            data-testid="input-event-end-time"
          />
          {errors.endTime && (
            <p className="text-sm text-red-600 mt-1">{errors.endTime.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="maxAttendees">Max Attendees (Optional)</Label>
          <Input
            id="maxAttendees"
            type="number"
            {...register("maxAttendees", { valueAsNumber: true })}
            placeholder="Leave blank for unlimited"
            data-testid="input-event-max-attendees"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="imageUrl">Event Image URL (Optional)</Label>
          <Input
            id="imageUrl"
            {...register("imageUrl")}
            placeholder="https://example.com/image.jpg"
            data-testid="input-event-image-url"
          />
        </div>

        <div className="col-span-2 flex items-center space-x-2">
          <input
            id="isFeatured"
            type="checkbox"
            {...register("isFeatured")}
            className="w-4 h-4 text-solana-purple border-gray-300 rounded focus:ring-solana-purple"
            data-testid="checkbox-event-featured"
          />
          <Label htmlFor="isFeatured">Feature this event</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="submit" className="bg-solana-purple hover:bg-solana-purple/90">
          Create Event
        </Button>
      </div>
    </form>
  );
}