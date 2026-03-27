import api from "./api";

const token = localStorage.getItem("token");

const exportService = {
  pdf: async () => {
    try {
      const response = await api.get("/bookings/export/pdf", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.download = "report-booking.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Export PDF Error: ", error);
    }
  },

  excel: async () => {
    try {
      const response = await api.get("/bookings/export/excel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.download = "report-booking.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Export Excel Error: ", error);
    }
  },
};

export default exportService;
