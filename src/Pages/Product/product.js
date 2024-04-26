import React, { useState } from "react";
import "./product.css"
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import { FaSearch } from "react-icons/fa";
import Table from "./Table/table";

function Product() {

    const [value, setValue] = useState("")
    return (
        <LayoutComponent title="Produto">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" />
                    <FaSearch className="icon-search" />
                </div>

                <button className="adicionar">ADICIONAR</button>
            </LayoutFilter>

            <Table />
        </LayoutComponent>
    )
}

export default Product