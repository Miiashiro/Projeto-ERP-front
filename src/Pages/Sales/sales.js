import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import Table from "./Table/table";
import "./sales.css"

function Sale() {

    const [filter, setFilter] = useState("")

    return (
        <LayoutComponent title="Venda">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    <FaSearch className="icon-search" />
                </div>

                <NavLink to="/Venda/Adicionar">
                    <button className="buttonOpen">ADICIONAR</button>
                </NavLink>
            </LayoutFilter>
            
            <div className="wrap-table">
                <Table filter={filter} />
            </div>
        </LayoutComponent>
    )
}

export default Sale