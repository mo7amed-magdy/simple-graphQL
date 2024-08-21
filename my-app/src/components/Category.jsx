import React, { useState } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import { FaTrash } from 'react-icons/fa';

const GET_Ctagories = gql`
query getCtegories{
    getCtegories{
    name
    _id
  }
}
`;

const DELETE_CATEGORY = gql`
mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
        _id
        name
    }
}
`
const ADD_CATEGORY = gql`
mutation addCategory($name: String!) {
  addCategory(name: $name) {
    _id
    name
  }
}`
export default function Category() {
    const [name, setName] = useState("")
    let { data, loading, error } = useQuery(GET_Ctagories)
    let [remove] = useMutation(DELETE_CATEGORY)
    let [addCategory] = useMutation(ADD_CATEGORY)
    if (loading) return <h3>Loading...</h3>
    if (error) return <h3>error...</h3>
    function getName({ target }) {
        setName(target.value)
    }
    function sendCategory() {

        addCategory({ variables: { name }, refetchQueries: [{ query: GET_Ctagories }] })
        setName('')

    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add New Category
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <input value={name} onChange={getName} type="text" className='form-control' placeholder='Type category name' />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button onClick={sendCategory} data-bs-dismiss="modal" type="button" className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 m-auto">
                    <table className='table text-center'>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.getCtegories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td> <button onClick={() =>
                                        remove({ variables: { id: category._id }, refetchQueries: [{ query: GET_Ctagories }] })
                                    } className=' btn btn-danger'><FaTrash /></button></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
