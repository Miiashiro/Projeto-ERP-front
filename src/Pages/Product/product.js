import React from "react";
import "./product.css"
import SideBar from "../../Components/SideBar/sidebar"
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
import { FaSearch } from "react-icons/fa";

function Product(){
    return(
        <div className="container-prod">
            <SideBar />
            <main>
                <span>Produto</span>

                <div className="content">
                    <div className="wrap">
                    <LayoutFilter>
                        <div className="wrap-search">
                            <input />
                            <FaSearch className="icon" />
                        </div>

                        <button>Adicionar</button>
                    </LayoutFilter>

                    opaaaaaaaaaaaaaaaaa
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Product