import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LayoutComponent from "../../Components/LayoutComponentUsual/layoutComponent";
import LayoutFilter from "../../Components/LayoutFilter/layoutFilter";
function Sale() {
    
    const [filter, setFilter] = useState("")

    return(
        <LayoutComponent title="Venda">
            <LayoutFilter>
                <div className="wrap-search">
                    <input type="search" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    <FaSearch className="icon-search" />
                </div>

                <button>Adicionar</button>
            </LayoutFilter>

            opaaaaa
        </LayoutComponent>
    )
}

export default Sale