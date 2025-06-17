import Modal from "@/app/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  // Función para resetear el formulario
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus(Status.ToDo);
    setPriority(Priority.Backlog);
    setTags("");
    setStartDate("");
    setDueDate("");
    setAuthorUserId("");
    setAssignedUserId("");
    setProjectId("");
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      // Solo formatear fechas si no están vacías
      const formattedStartDate = startDate 
        ? formatISO(new Date(startDate), { representation: "complete" })
        : undefined;
      
      const formattedDueDate = dueDate 
        ? formatISO(new Date(dueDate), { representation: "complete" })
        : undefined;

      await createTask({
        title,
        description: description || undefined,
        status,
        priority,
        tags: tags || undefined,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(authorUserId),
        assignedUserId: assignedUserId ? parseInt(assignedUserId) : undefined,
        projectId: id !== null ? Number(id) : Number(projectId),
      }).unwrap();

      // Si la tarea se crea exitosamente, resetear el formulario y cerrar el modal
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  // CORREGIDA: La validación estaba invertida
  const isFormValid = () => {
    return title.trim() && authorUserId.trim() && (id !== null || projectId.trim());
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Crear Nueva Tarea">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Título *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className={inputStyles}
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="">Selección Estado</option>
            <option value="To Do">Por Hacer</option>
            <option value="Work In Progress">En Progreso</option>
            <option value="Under Review">Bajo Revisión</option>
            <option value="Completed">Completado</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="">Selección Prioridad</option>
            <option value="Urgent">Urgente</option>
            <option value="High">Alto</option>
            <option value="Medium">Medio</option>
            <option value="Low">Bajo</option>
            <option value="Backlog">Reserva</option>
          </select>
        </div>
        
        <input
          type="text"
          className={inputStyles}
          placeholder="Etiquetas (separadas por comas)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de inicio
            </label>
            <input
              type="date"
              className={inputStyles}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              className={inputStyles}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <input
          type="text"
          className={inputStyles}
          placeholder="ID de Usuario del Autor *"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
          required
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="ID de Usuario Asignado"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="ID del Proyecto *"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
        )}

        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creando..." : "Crear Tarea"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;