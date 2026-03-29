import { useNavigate } from "react-router-dom";
import { Button, Card, Input, ModalAlert } from "../../components";
import { useState } from "react";
import type { CreateRoomType } from "../../services/roomService";
import { initialModalAlertState, type ModalAlertState } from "../../types/ModalState";
import roomService from "../../services/roomService";

export default function CreateRoomTypePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<CreateRoomType>({
    name: "",
    capacity: 0,
  });

  const [modal, setModal] = useState<ModalAlertState>(initialModalAlertState);

  const showModal = (title: string, message: string) => {
    setModal({
      show: true,
      message,
      title,
      onClose: () => navigate(0)
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    if (!form.name || !form.capacity) {
      showModal("Required Fields", "Please fill in all required fields.");
    } else {
      try {
        await roomService.createRoomType({
          name: form.name,
          capacity: form.capacity
        });
        showModal("Successful", "New room type successfully created.");
      } catch (error) {
        showModal("Failed", "Failed created new room type.")
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <>

      <Card
        title="Create A Room Type"
        description="Please fill out the form below to create a new room type."
      >
        <form>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-y-6">
              <Input
                id="room_type"
                name="name"
                label="Type Name"
                type="text"
                value={form.name}
                placeholder="Ex. rt1"
                onChange={handleOnChange}
                className="col-span-4"
              />

              <Input
                id="room_capacity"
                name="capacity"
                label="Room Capacity"
                type="number"
                value={form.capacity}
                placeholder="Ex. 1"
                onChange={handleOnChange}
                className="col-span-4"
              />
            </div>
            <Button
              onClick={() => handleSubmit()}
              disabled={submitting}
            >
              {submitting ? "Creating room..." : "Create Room Type"}
            </Button>
          </div>
        </form>
      </Card>

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