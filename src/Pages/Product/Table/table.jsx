import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import api from "../../../api"

export default function Table(){

    const [data, setData] = useState([])

    useEffect(() => {
        async function getData(){
            const { data } = await api.get('/produto')
            setData(data)
        }
        getData()
    }, [data])

    const columns=[
        {field: "id", headerName: "ID", width: 80},
        {field: "produto", headerName: "Produto", width: 180},
        {field: "desc", headerName: "Descrição", width: 300},
        {field: "preco", headerName: "Preço", width: 130},
        {field: "quant", headerName: "Quantidade", width: 130},
        {field: "quantMin", headerName: "Quant Min", width: 130},
        {field: "quantMax", headerName: "Quant Max", width: 130}
    ]

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
    

    return(
        <div style={{ width: '100%', backgroundColor: 'white'}}>
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