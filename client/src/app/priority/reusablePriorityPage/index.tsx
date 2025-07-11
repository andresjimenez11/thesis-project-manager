"use client"

import Header from "@/app/components/Header";
import ModalNewTask from "@/app/components/ModalNewTask";
import TaskCard from "@/app/components/TaskCard";
import { useAppSelector } from "@/app/redux";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Título",
    width: 100,
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 200,
  },
  {
    field: "status",
    headerName: "Estado",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Prioridad",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Etiquetas",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Fecha Inicio",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Fecha Fin",
    width: 130,
  },
/*   {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  }, */
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const { data:tasks, isLoading, isError: isTasksError} = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if(isTasksError || !tasks) return <div>Error obteniendo tareas</div>

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Prioridad"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Añadir Nueva Tarea
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          Lista
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")}
        >
          Tabla
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
}

export default ReusablePriorityPage;