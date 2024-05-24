import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import ModalAdd from "./Modals/modalAdd";
import "./billsToPay.css"
import Table from "./Table/table"

function Bill(){

    const [filter, setFilter] = useState("")
    
    return(
        <LayoutComponent title="Contas a Pagar">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)}/>
                    <FaSearch className="icon-search"/>
                </div>

                <ModalAdd/>
            </LayoutFilter>
            <div className="wrap-table">
                <Table filter={filter} />
            </div>
        </LayoutComponent>
    )
}

export default Bill