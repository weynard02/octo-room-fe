import React from "react";
import { Button, Card, Input } from "../../components";

const MakeAppointmentPage: React.FC = () => {
  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <Card
          title="Make an Appointment"
          description="Please fill out the form below to book your appointment."
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="service"
                >
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full p-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                >
                  <option value="consultation">General Consultation</option>
                  <option value="followup">Follow-up</option>
                  <option value="urgent">Urgent Care</option>
                </select>
              </div>

              <Input id="date" name="date" label="Preferred Date" type="date" />

              <Input id="time" name="time" label="Preferred Time" type="time" />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="notes"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Any specific concerns..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Confirm Booking</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default MakeAppointmentPage;
