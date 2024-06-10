import React, { useState, useEffect } from "react";
import api from "../../../api";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment/moment";
import ModalEdit from "../Modals/modalEdit";
import ModalDelete from "../Modals/modalDelete";

export default function Table({ filter }) {

    //Atributo
    const [data, setData] = useState([])

    //Método get
    async function getData() {
        const { data } = await api.get('/conta')
        if (data.length > 0) {
            setData(data)
        } else {
            const falseData = [
                {
                    id: "",
                    conta: "",
                    preco: "",
                    data: ""
                }
            ]
            setData(falseData)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    //Colunas
    const columns = [
        { field: "id", headerName: "Id", width: 100 },
        { field: "conta", headerName: "Conta", width: 210 },
        { field: "preco", headerName: "Preço", width: 180 },
        { field: "data", headerName: "Data Vencimento", width: 180 },
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

    //Linha
    const initialRows = data.map((row) => (
        {
            id: row.id_bill,
            conta: row.name_bill,
            preco: row.price,
            data: moment(row.data_vencimento).format("DD/MM/YYYY")
        }
    ))

    //Filtro de busca
    const contaFiltrada = initialRows.filter((row) => {
        const lowerSearch = filter.toLowerCase()
        return row.conta?.toString().toLowerCase().includes(lowerSearch)
    })

    return (
        <div className="table">
            <DataGrid columns={columns}
                rows={contaFiltrada}
                initialState={{
                    ...initialRows.initialState,
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25, 50]} />
        </div>
    )
}