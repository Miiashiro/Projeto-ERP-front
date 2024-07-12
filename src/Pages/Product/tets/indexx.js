import React from 'react'
import Swal from 'sweetalert2'


const Indexx = () => {
    
    const Swal = require('sweetalert2')

    function Teste(){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
    }

  return (
    <div>
        <button onClick={Teste}>Adicionar</button>
    </div>
  )
}

export default Indexx