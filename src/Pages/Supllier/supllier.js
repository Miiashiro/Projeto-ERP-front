import React from "react";
import { FaSearch } from "react-icons/fa";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import "./supllier.css"
import Table from "./Table/table";


function Fornecedor() {
    return (
        <LayoutComponent title="Fornecedor">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" />
                    <FaSearch className="icon-search" />
                </div>

                <button>Adicionar</button>
            </LayoutFilter>

            <Table />
        </LayoutComponent>
    )
}

export default Fornecedor