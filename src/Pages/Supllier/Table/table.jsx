import React, { useEffect, useState } from "react";
import api from "../../../api";
import { DataGrid } from "@mui/x-data-grid";

export default function Table(){
    const [data, setData] = useState([])

    async function getData(){
        const {data} = await api.get('/fornecedor')
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const columns=[
        {field: "id", headerName: "ID", width: 100},
        {field: "fornecedor", headerName: "Fornecedor", width: 180},
        {field: "email", headerName: "Email", width: 180},
        {field: "telefone", headerName: "Telefone", width: 120},
        {field: "cep", headerName: "Cep", width: 110},
        {field: "endereco", headerName: "Endereço", width: 220},
        {field: "cidade", headerName: "Cidade", width: 120},
        {field: "pais", headerName: "País", width: 120}
    ]

    const initialRows = data.map((row) => (
        {
            id: row.id_supllier,
            fornecedor: row.supllier_name,
            email: row.email,
            telefone: row.tel,
            cep: row.cep,
            endereco: row.address,
            cidade: row.city,
            pais: row.country
        }
    ))

    return(
        <div style={{ width: '100%', height: 400, backgroundColor: 'white'}}>
            <DataGrid columns={columns}
            rows={initialRows}
            initialState={{
                ...initialRows.initialState,
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, 50]} />
        </div>
    )
}