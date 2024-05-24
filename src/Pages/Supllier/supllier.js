import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import "./supllier.css"
import Table from "./Table/table";
import ModalAdd from "./Modals/modalAdd"

function Fornecedor() {

    const [filter, setFilter] = useState("")
    
    return (
        <LayoutComponent title="Fornecedor">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)}/>
                    <FaSearch className="icon-search" />
                </div>

                <ModalAdd />
            </LayoutFilter>

            <div className="wrap-table">
                <Table filter={filter}/>
            </div>
        </LayoutComponent>
    )
}

export default Fornecedor