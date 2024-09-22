import React, { useState, useEffect } from 'react';
import './materials.css'; // CSS file for styling

const Materials = () => {
  const [materials, setMaterials] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/api/packaging-materials')
    .then((res)=>res.json())
    .then((data)=>{setMaterials(data)})
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const [editIndex, setEditIndex] = useState(-1);
  const [editFormData, setEditFormData] = useState({});

  // Handle input changes during edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Enable edit mode for a specific row
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData(materials[index]);
  };

  // Save the edited row
  const handleSaveClick = async () => {
    const materialId = materials[editIndex]._id;

    try {
      const response = await fetch(`http://localhost:4000/api/packaging-materials/${materialId}`, {
        method: 'PUT', // or 'PATCH' if your API uses PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const updatedMaterial = await response.json();
        const updatedMaterials = [...materials];
        updatedMaterials[editIndex] = updatedMaterial;
        setMaterials(updatedMaterials);
        setEditIndex(-1); // Exit edit mode
      } else {
        console.error('Failed to save material');
      }
    } catch (error) {
      console.error('Error saving material:', error);
    }
  };

  // Delete a row
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/packaging-materials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted material from state
        setMaterials((prevMaterials) =>
          prevMaterials.filter((material) => material._id !== id)
        );
      } else {
        console.error('Failed to delete material');
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  return (
    <div className="table-container">
      <h2>Packaging Materials</h2>
      <table className="packaging-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Material</th>
            <th>Internal Measurements</th>
            <th>Weight Limit</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={material.id}>
              {editIndex === index ? (
                <>
                  <td>{material._id}</td>
                  <td>
                    <input
                      type="text"
                      name="material"
                      value={editFormData.material}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="internalMeasurement"
                      value={editFormData.internalMeasurement}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="weightLimit"
                      value={editFormData.weightLimit}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="image"
                      value={editFormData.uploadImage}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>{material.lastModified}</td>
                  <td>
                    <button onClick={handleSaveClick} className="save-btn">
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{material._id}</td>
                  <td>{material.packagingMaterial}</td>
                  <td>{material.internalMeasurement}</td>
                  <td>{material.weightLimit}</td>
                  <td>{material.description}</td>
                  <td>{material.uploadImage}</td>
                  <td>{material.lastModified}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(index)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(material._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Materials;
