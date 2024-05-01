import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react'
import { FaEdit } from "react-icons/fa";

const EditModal = ({params}) => {
  return (
    <>
      <GridActionsCellItem
        icon={<FaEdit />}
        label="Edit"
        />
    </>
  )
}

export default EditModal