import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { classNames } from "primereact/utils";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const SellerDashboard = () => {
  const inital_state = [
    {
      name: "",
      address: "",
      bedrooms: "",
      available: null,
      rate: "",
    },
  ];

  const [propertyDetails, setpropertyDetails] = useState([]);
  const [file, setFile] = useState(null);
  const [uploaddisable, setUploadDisable] = useState(false);
  const [fileuploadKey, setFileuploadKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [sellerDetails, setSellerDetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dashboardkey, setDashBoardKey] = useState(0);
  const [updateResponse, setUpdateResponse] = useState({});
  const [currentProductId, setCurrentProductId] = useState(null);
  const [edituploaddisable, setEditUploadDisable] = useState(false);
  //   const [updatedProducts, setupdatedProducts] = useState([]);

  const [editVisible, setEditVisible] = useState(false);

  const formData = new FormData();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "available") {
      const parsedDate = value
        ? formatDate(new Date(value), "yyyy-MM-dd")
        : null;
      setpropertyDetails({ ...propertyDetails, [name]: parsedDate });
    } else {
      setpropertyDetails({ ...propertyDetails, [name]: value });
    }
  };

  const handleChangeUpdated = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "available") {
      const parsedDate = value
        ? formatDate(new Date(value), "yyyy-MM-dd")
        : null;
      setUpdateResponse((prevResponse) => ({
        ...prevResponse,
        [name]: parsedDate,
      }));
    } else {
      setUpdateResponse((prevResponse) => ({
        ...prevResponse,
        [name]: value,
      }));
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onUpload = (event) => {
    const files = event.files[0];
    setFile(files);
    setEditUploadDisable(true);
    setUploadDisable(true);
  };

  const handleClear = () => {
    setpropertyDetails(inital_state);
    setFile(null);
    setUploadDisable(false);
    setFileuploadKey((prev) => prev + 1);
  };

  const jsonBlob = new Blob([JSON.stringify(propertyDetails)], {
    type: "application/json",
  });
  formData.append("json", jsonBlob);
  formData.append("email", sellerDetails.email);
  formData.append("image", file);

  const handleUpload = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/seller/addproperty", formData)
      .then((res) => {
        console.log(res.data);
        alert("Property Added Successfully!");
        setDashBoardKey(dashboardkey + 1);
        setVisible(false);
        setUploadDisable(false);
        setpropertyDetails(inital_state);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    console.log(propertyDetails);
    console.log(sellerDetails.email);
    console.log(file);
    console.log(formData);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/seller/seller/1`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [dashboardkey]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/seller/details?email=seller@gmail.com")
      .then((res) => {
        setSellerDetails(res.data);
      })

      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  const handleAddProperty = () => {
    setVisible(true);
  };

  const handleEdit = async (id) => {
    await axios
      .get(`http://localhost:8080/seller/property/${id}`)
      .then((res) => {
        setUpdateResponse(res.data);
        setCurrentProductId(id);
        setEditVisible(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const uploadedDetails = {
    name: updateResponse.name,
    address: updateResponse.address,
    bedrooms: updateResponse.bedrooms,
    available: updateResponse.available,
    rate: updateResponse.rate,
  };

  const updatedFormData = new FormData();

  const jsonBlobUpdated = new Blob([JSON.stringify(uploadedDetails)], {
    type: "application/json",
  });
  updatedFormData.append("json", jsonBlobUpdated);
  updatedFormData.append("email", sellerDetails.email);
  updatedFormData.append("image", file);

  const handleEditUpload = async (event) => {
    await axios
      .put(
        `http://localhost:8080/seller/editproperty/${currentProductId}`,
        updatedFormData
      )
      .then((res) => {
        console.log(res.data);
        alert("Property Updated Successfully!");
        setDashBoardKey(dashboardkey + 1);
        setCurrentProductId(null);
        setUpdateResponse(inital_state);
        setEditUploadDisable(false);
        setEditVisible(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleDelete = async (product) => {
    const property_id = product.id;
    console.log(property_id);
    await axios
      .delete(`http://localhost:8080/seller/deleteProperty/${property_id}`)
      .then((res) => {
        if (products) {
          setpropertyDetails((prevDetails) => {
            return prevDetails.filter((products) => products.id !== product.id);
          });
          setDashBoardKey(dashboardkey + 1);
          alert("Property Deleted Successfully");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const itemTemplate = (product, index) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
        <div className="flex flex-column p-4 border-1 surface-border surface-card border-round">
          <div className="flex-1 flex flex-column">
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
              <div className="flex align-items-center gap-2">
                <i className="pi pi-map-marker"></i>
                <span className="font-semibold">{product.address}</span>
              </div>
            </div>
            <div className="flex flex-column align-items-center gap-3 py-5">
              <img
                className="w-6 shadow-2 border-round"
                src={`${`data:image/jpeg;base64,${product.image}`}`}
                alt={product.name}
                style={{ height: "150px" }}
              />
              <div className="text-2xl font-bold">{product.name}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-column gap-3">
            <div className="flex flex-row align-items-center justify-content-between gap-2">
              <div className="flex flex-column gap-2">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-warehouse"></i>
                  <span className="font-semibold">
                    Apratment Type: {product.bedrooms}BHK
                  </span>
                </span>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-calendar"></i>
                  <span className="font-semibold">
                    Available from : {product.available}
                  </span>
                </span>
              </div>
              <div>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-credit-card"></i>
                  <span className="font-semibold">
                    {formatCurrency(product.rate)}
                  </span>
                </span>
              </div>
            </div>
            <div className="product-update flex gap-2 justify-content-between">
              <Button
                icon="pi pi-pencil"
                label="Edit"
                onClick={() => handleEdit(product.id)}
              ></Button>
              <Dialog
                visible={editVisible}
                style={{ width: "50vw" }}
                draggable={false}
                header={
                  <div>
                    <p>Add Property</p>
                  </div>
                }
                onHide={() => {
                  if (!editVisible) return;
                  setEditVisible(false);
                }}
              >
                <div className="">
                  <div className="flex flex-column gap-3">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="name">Name</label>
                      <InputText
                        id="name"
                        type="text"
                        name="name"
                        value={updateResponse.name}
                        onChange={(e) => handleChangeUpdated(e)}
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="flex-1 flex flex-column gap-2">
                        <label htmlFor="address"> Location</label>
                        <InputText
                          id="bedroaddressoms"
                          type="text"
                          name="address"
                          value={updateResponse.address}
                          onChange={(e) => handleChangeUpdated(e)}
                        />
                      </div>
                      <div className="flex flex-column gap-2">
                        <label htmlFor="rate">Price </label>
                        <InputText
                          id="rate"
                          type="number"
                          placeholder="Price"
                          name="rate"
                          value={updateResponse.rate}
                          onChange={(e) => handleChangeUpdated(e)}
                          style={{ '-moz-appearance': 'textfield' }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row  gap-2">
                      <div className="flex flex-1 flex-column gap-2">
                        <label htmlFor="bedrooms">Apartment Type (BHK)</label>
                        <InputText
                          id="bedrooms"
                          type="number"
                          name="bedrooms"
                          value={updateResponse.bedrooms}
                          onChange={(e) => handleChangeUpdated(e)}
                        />
                      </div>
                      <div className="flex flex-column gap-2">
                        <label htmlFor="available">Availabale From</label>
                        <InputText
                          type="date"
                          id="available"
                          name="available"
                          dateFormat="yy-mm-dd"
                          showIcon
                          iconPos="left"
                          showButtonBar
                          value={updateResponse.available}
                          onChange={(e) => handleChangeUpdated(e)}
                        />
                      </div>
                    </div>

                    <div className="card flex  flex-column gap-2 ">
                      <div>
                        <img
                          className="w-2 shadow-2 border-round"
                          src={`${`data:image/jpeg;base64,${updateResponse.image}`}`}
                          alt={product.name}
                          style={{ height: "80px" }}
                        />
                      </div>
                      <div className="card flex  flex-row justify-content-between ">
                        <FileUpload
                          key={fileuploadKey}
                          mode="basic"
                          type="choose"
                          name="demo[]"
                          auto={false}
                          url={undefined}
                          accept="application/image"
                          maxFileSize={20000000}
                          chooseLabel="Update Image"
                          className="fp-01"
                          onSelect={onUpload}
                          disabled={edituploaddisable}
                        />
                        <Button
                          label="Save changes"
                          severity="success"
                          onClick={ handleEditUpload}
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
              <Button
                icon="pi pi-trash" label="Delete"
                severity="danger"
                onClick={() => handleDelete(product)}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="grid grid-nogutter mx-8 my-8">
        {items.map((product, index) => itemTemplate(product, index))}
      </div>
    );

    // return <div className="grid grid-nogutter mx-8 my-8">{list}</div>;
  };
  return (
    <div className="card">
      <div className="flex justify-content-between mt-5 mx-8">
        <h1>
          Hello {sellerDetails.firstname} {sellerDetails.lastname}{" "}
          {sellerDetails.id}
        </h1>
        <span className="flex align-items-center">
          <Button label="Add Property" onClick={handleAddProperty}></Button>
          <Dialog
            visible={visible}
            style={{ width: "50vw" }}
            draggable={false}
            header={
              <div>
                <p>Add Property</p>
              </div>
            }
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
            footer={
              <div>
                <Button label="Submit" onClick={handleUpload}></Button>
              </div>
            }
          >
            <div className="">
              <div className="flex flex-column gap-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="name">Name</label>
                  <InputText
                    id="name"
                    type="text"
                    name="name"
                    value={propertyDetails.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-1 flex-column gap-2">
                    <label htmlFor="address"> Location</label>
                    <InputText
                      id="bedroaddressoms"
                      type="text"
                      name="address"
                      value={propertyDetails.address}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="flex flex-column gap-2">
                    <label htmlFor="rate">Price </label>
                    <InputText
                      id="rate"
                      type="number"
                      placeholder="Price"
                      name="rate"
                      value={propertyDetails.rate}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="flex flex-row  gap-2">
                  <div className="flex flex-1 flex-column gap-2">
                    <label htmlFor="bedrooms">Apartment Type (BHK)</label>
                    <InputText
                      id="bedrooms"
                      type="number"
                      name="bedrooms"
                      value={propertyDetails.bedrooms}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="flex flex-column gap-2">
                    <label htmlFor="available">Availabale From</label>
                    <Calendar
                      id="available"
                      name="available"
                      dateFormat="yy-mm-dd"
                      showIcon
                      iconPos="left"
                      showButtonBar
                      value={propertyDetails.available}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="card flex  flex-row gap-2 ">
                  <FileUpload
                    key={currentProductId}
                    mode="basic"
                    type="choose"
                    name="demo[]"
                    auto={false}
                    url={undefined}
                    accept="application/image"
                    maxFileSize={20000000}
                    chooseLabel="Choose Property Image"
                    className="fp-01"
                    onSelect={onUpload}
                    disabled={uploaddisable}
                  />

                  <Button
                    label="Clear"
                    severity="danger"
                    onClick={handleClear}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </span>
      </div>
      <DataView
        value={products}
        listTemplate={listTemplate}
        paginator
        rows={6}
      />
    </div>
  );
};

export default SellerDashboard;
