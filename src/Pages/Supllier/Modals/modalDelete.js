import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import { FaTrash } from 'react-icons/fa'

const ModalDelete = () => {
  return (
    <>
      <GridActionsCellItem
        icon={<FaTrash />}
        label="delete"
      />
    </>
  )
}

export default ModalDelete