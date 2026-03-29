import { useEffect, useState } from "react";
import { Button, Card, Input, ModalAlert } from "../../components";
import roomService, { type CreateRoom, type RoomType } from "../../services/roomService";
import { useNavigate } from "react-router-dom";
import { initialModalAlertState, type ModalAlertState } from "../../types/ModalState";

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  const [form, setForm] = useState<CreateRoom>({
    name: "",
    floor: 0,
    type_id: ""
  });
  const [modal, setModal] = useState<ModalAlertState>(initialModalAlertState);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      setLoading(true);
      try {
        const response = await roomService.getRoomTypes();
        setRoomTypes(response.data)
      } catch (error) {
        console.error("Failed to retrive room types: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, [])

  const showAlert = (title: string, message: string) => {
    setModal({
      show: true,
      title,
      message,
      onClose: () => navigate(0)
    });
  };


  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "floor" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    if (!form.name || !form.floor || !form.type_id) {
      showAlert("Required Fields", "Please fill in all required fields.");
    } else {
      try {
        await roomService.createRoom({
          name: form.name,
          floor: form.floor,
          type_id: form.type_id
        });
        showAlert("Success", "New room successfully created")
      } catch (error) {
        console.error("Creating new room failed: ", error);
        // alert("Failed created new room");
        showAlert("Error", "Failed created new room")
      } finally {
        setSubmitting(false);
      }
    }
  };


  return (
    <>
      <Card
        title="Create A Room"
        description="Please fill out the form below to create a new room."
      >
        <form>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-y-6">
              <Input
                id="room_name"
                name="name"
                label="Room Name"
                type="text"
                value={form.name}
                placeholder="Ex. Burangrang"
                onChange={handleOnChange}
                className="col-span-4"
              />

              <Input
                id="room_floor"
                name="floor"
                label="Floor"
                type="number"
                value={form.floor}
                placeholder="Ex. 1"
                onChange={handleOnChange}
                className="col-span-4"
              />

              <div className="col-span-4">
                <label
                  htmlFor="roomType"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type
                </label>
                <select
                  id="roomType"
                  name="type_id"
                  value={form.type_id}
                  onChange={handleOnChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                  <option>
                    {loading ? "Loading room types... " : "Select Type"}
                  </option>
                  {roomTypes.map((roomType) => (
                    <option key={roomType.type_id} value={roomType.type_id}>
                      {roomType.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              className="bg-red-600 hover:bg-red-700 duration-200"
              onClick={() => handleSubmit()}
              disabled={submitting}
            >
              {submitting ? "Creating room..." : "Create Room"}
            </Button>
          </div>
        </form>
      </Card >

      {modal.show && (
        <ModalAlert
          title={modal.title}
          message={modal.message}
          onClose={modal.onClose || (() => setModal(initialModalAlertState))}
        />
      )}
    </>


  )
}