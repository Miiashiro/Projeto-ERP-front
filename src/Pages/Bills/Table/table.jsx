import React, { useState, useEffect } from "react";
import api from "../../../api";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment/moment";

export default function Table({filter}){

    //Atributo
    const [data, setData] = useState([])

    //Método get
    async function getData(){
        const { data } = await api.get('/conta')
        setData(data)
    }

    useEffect(() => {
        getData()
    }, [])

    //Colunas
    const columns=[
        {field: "id", headerName: "Id", width: 100},
        {field: "conta", headerName: "Conta", width: 180},
        {field: "preco", headerName: "Preco", width: 180},
        {field: "data", headerName: "Data Vencimento", width: 180}
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
        return row.conta.toString().toLowerCase().includes(lowerSearch)
    })

    return(
        <div style={{ width: '100%', height: 400, backgroundColor: 'white'}}>
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