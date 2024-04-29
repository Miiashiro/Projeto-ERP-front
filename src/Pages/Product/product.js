import React, { useState } from "react";
import "./product.css"
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import { FaSearch } from "react-icons/fa";
import Table from "./Table/table";
import AddModal from "./Modals/addModal";

function Product() {

    const [filter, setFilter] = useState("")

    return (
        <LayoutComponent title="Produto">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)}/>
                    <FaSearch className="icon-search" />
                </div>

                <AddModal />
            </LayoutFilter>

            <Table filter={filter}/>
        </LayoutComponent>
    )
}

export default Product