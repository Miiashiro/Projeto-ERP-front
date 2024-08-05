import React, { useEffect, useState } from "react";
import api from "../../../api";
import { DataGrid } from "@mui/x-data-grid";
import ModalEdit from "../Modals/modalEdit";
import ModalDelete from "../Modals/modalDelete";
import "../supllier.css"

export default function Table({ filter }) {
    const [data, setData] = useState([])
    const token = sessionStorage.getItem("Token")

    async function getData() {
        const { data } = await api.get('/fornecedor', {headers: {'Authorization':`Bearer ${token}`}})
        if (data.length > 0) {
            setData(data)
        } else {
            const falseData = [
                {
                    id: "",
                    fornecedor: "",
                    email: "",
                    telefone: "",
                    cnpj: "",
                    cep: "",
                    endereco: "",
                    bairro: "",
                    cidade: "",
                    estado: "",
                }
            ]
            setData(falseData)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "fornecedor", headerName: "Fornecedor", width: 180 },
        { field: "email", headerName: "Email", width: 180 },
        { field: "telefone", headerName: "Telefone", width: 120 },
        { field: "cnpj", headerName: "CNPJ", width: 110 },
        { field: "cep", headerName: "Cep", width: 100 },
        { field: "endereco", headerName: "Endereço", width: 200 },
        { field: "bairro", headerName: "Bairro", width: 120 },
        { field: "cidade", headerName: "Cidade", width: 120 },
        { field: "estado", headerName: "Estado", width: 100 },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
                <>
                    <ModalEdit params={params} />

                    <ModalDelete params={params} />
                </>
            ]
        }
    ]

    const initialRows = data.map((row) => (
        {
            id: row.id_supllier,
            fornecedor: row.supllier_name,
            email: row.email,
            telefone: row.tel,
            cnpj: row.cnpj,
            cep: row.cep,
            endereco: row.address,
            bairro: row.neighborhood,
            cidade: row.city,
            estado: row.state
        }
    ))

    const forneFiltrado = initialRows.filter((row) => {
        const lowerSearch = filter.toLowerCase()
        return row.fornecedor?.toString().toLowerCase().includes(lowerSearch)
    })

    return (
        <div className="table">
            <DataGrid columns={columns}
                rows={forneFiltrado}
                initialState={{
                    ...initialRows.initialState,
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                getRowHeight={() => 'auto'} />
        </div>
    )
}