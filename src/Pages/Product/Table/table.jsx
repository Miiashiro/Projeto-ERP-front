import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import api from "../../../api"
import EditModal from "../Modals/modalEdit"
import DeleteModal from "../Modals/modalDelete"
import "../product.css"

export default function Table({ filter }) {

    //Atributo
    const [data, setData] = useState([])

    //Método get
    async function getData() {
        const { data } = await api.get('/produto')

        if (data > 0) {
            setData(data)
        } else {
            const falseData = [
                {
                    id: "",
                    produto: "",
                    desc: "",
                    preco: "",
                    quant: "",
                    quantMin: "",
                    quantMax: ""
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
        { field: "id", headerName: "ID", width: 100 },
        { field: "produto", headerName: "Produto", width: 180 },
        { field: "desc", headerName: "Descrição", width: 300 },
        { field: "preco", headerName: "Preço", width: 130 },
        { field: "quant", headerName: "Quantidade", width: 130 },
        { field: "quantMin", headerName: "Quant Min", width: 130 },
        { field: "quantMax", headerName: "Quant Max", width: 130 },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <>
                    <EditModal params={params} />

                    <DeleteModal params={params} />
                </>
            ]
        }
    ]

    //Linha
    const initialRows = data.map((row) => (
        {
            id: row.id_prod,
            produto: row.product_name,
            desc: row.description,
            preco: row.price,
            quant: row.quantity,
            quantMin: row.quant_min,
            quantMax: row.quant_max
        }
    ))

    //Filtro de busca
    const prodFiltrado = initialRows.filter((row) => {
        const lowerBusca = filter.toLowerCase()
        return row.produto?.toString().toLowerCase().includes(lowerBusca)
    })

    return (
        <div className="table">
            <DataGrid columns={columns}
                rows={prodFiltrado}
                initialState={{
                    ...initialRows.initialState,
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25, 50]} />
        </div>
    )
}