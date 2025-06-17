"use client";
import { useGetTeamsQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/app/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID Equipo", width: 100 },
  { field: "teamName", headerName: "Nombre Equipo", width: 200 },
  { field: "productOwnerUsername", headerName: "Propietario Proyecto", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Gerente Proyecto",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Equipos" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          // Opción 1: Usar la toolbar por defecto
          showToolbar
          // Opción 2: Usar GridToolbar para más control (comenta showToolbar si usas esta)
          // slots={{
          //   toolbar: GridToolbar,
          // }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;