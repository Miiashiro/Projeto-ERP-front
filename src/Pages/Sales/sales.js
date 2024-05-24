import React, { useState } from "react";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import { FaSearch } from "react-icons/fa";
import Table from "../Product/Table/table";
import ModalAdd from "../Product/Modals/modalAdd";
import "./sales.css"

function Product() {

    const [filter, setFilter] = useState("")

    return (
        <LayoutComponent title="Produto">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)}/>
                    <FaSearch className="icon-search" />
                </div>

                <ModalAdd />
            </LayoutFilter>
            
            <div className="space">
              <Table filter={filter}/>
            </div>
        </LayoutComponent>
    )
}

export default Product