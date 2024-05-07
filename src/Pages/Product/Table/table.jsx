import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import api from "../../../api"
import EditModal from "../Modals/editModal"
import DeleteModal from "../Modals/deleteModal"

export default function Table({filter}){

    const [data, setData] = useState([])

    async function getData(){
        const { data } = await api.get('/produto')
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const columns=[
        {field: "id", headerName: "ID", width: 100},
        {field: "produto", headerName: "Produto", width: 180},
        {field: "desc", headerName: "Descrição", width: 300},
        {field: "preco", headerName: "Preço", width: 130},
        {field: "quant", headerName: "Quantidade", width: 130},
        {field: "quantMin", headerName: "Quant Min", width: 130},
        {field: "quantMax", headerName: "Quant Max", width: 130},
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
               <>
                <EditModal params={params}/>
                
                <DeleteModal params={params}/>
               </>
            ]
        }
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
    
    const prodFiltrado = initialRows.filter((row) => {
        const lowerBusca = filter.toLowerCase()
        return row.produto.toString().toLowerCase().includes(lowerBusca)
    })

    return(
        <div style={{ width: '100%', height: 400, backgroundColor: 'white'}}>
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