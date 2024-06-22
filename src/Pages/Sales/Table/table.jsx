import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import moment from "moment/moment";
import ModalEdit from "../Modals/modalEdit";
import ModalDelete from "../Modals/modalDelete";

export default function Table({ filter }) {
    const [data, setData] = useState([])
    const token = sessionStorage.getItem("Token")

    async function getData() {
        const { data } = await api.get('/venda', {headers: {'Authorization':`Bearer ${token}`}})

        if (data.length > 0) {
            setData(data)
        }else{

            const falseData = [
                {
                    id_sale: "",
                    product_name: "",
                    quantidade: "",
                    price: "",
                    total: "",
                    date_sale: ""
                }
            ]
            setData(falseData)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "produto", headerName: "Produto", width: 180 },
        { field: "quant", headerName: "Quantidade", width: 130 },
        { field: "preco", headerName: "Preço", width: 130 },
        { field: "total", headerName: "Valor Total", width: 160 },
        { field: "data", headerName: "Data", width: 130 },
        {
            field: 'actions',
            type: 'actions',
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
            id: row.id_sale,
            produto: row.product,
            quant: row.quantidade,
            preco: row.price,
            total: row.total,
            data: moment(row.date_sale).format("DD/MM/YYYY")
        }
    ))

    const saleFiltrado = initialRows.filter((row) => {
        const lowerBusca = filter.toLowerCase()
        return row.produto.toString().toLowerCase().includes(lowerBusca)
    })

    return (
        <div className="table">
            <DataGrid columns={columns}
                rows={saleFiltrado}
                initialState={{
                    ...initialRows.initialState,
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25, 50]} />
        </div>
    )
}