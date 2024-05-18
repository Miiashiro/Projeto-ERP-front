import React from "react";
import { FaSearch } from "react-icons/fa";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import ModalAdd from "./Modals/modalAdd";
import "./billsToPay.css"

function Account(){
    return(
        <LayoutComponent title="Contas a Pagar">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" />
                    <FaSearch className="icon-search"/>
                </div>

                <ModalAdd />
            </LayoutFilter>
        </LayoutComponent>
    )
}

export default Account