import React from 'react';

const MakeAppointmentPage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Make an Appointment</h1>
        <p className="text-gray-600 mb-8">Please fill out the form below to book your appointment.</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">Service Type</label>
              <select 
                id="service" 
                name="service" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="consultation">General Consultation</option>
                <option value="followup">Follow-up</option>
                <option value="urgent">Urgent Care</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">Preferred Date</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="time">Preferred Time</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="notes">Additional Notes (Optional)</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Any specific concerns..."
            ></textarea>
          </div>
          
          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transform hover:-translate-y-0.5 transition active:scale-95"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAppointmentPage;
