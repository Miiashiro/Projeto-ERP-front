import React, { useState, useEffect } from "react"
import api from "../../../../api"
import "./contador.css"

function Contador() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function getSale() {
            try {
                const { data } = await api.get('/venda/lista')
                setData(data)
            } catch (error) {
                const sla = [
                    {
                        id_sale: "",
                        product_name: "",
                        quantidade: "",
                        price: "",
                        total: "",
                        date_sale: ""
                    }
                ]
                setData(sla)
                console.log(error)
            }
        }
        getSale()
    }, [data])

    const teste = () => {
        var soma = 0

        for (let i = 0; i < data.length; i++) {
            soma += data[i].total
        }

        return soma
    }
    return (
        <div className="contador">
            <span>Valor Total: R${teste()}</span>
        </div>
    )
}

export default Contador