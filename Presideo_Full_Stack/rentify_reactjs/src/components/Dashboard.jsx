import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { classNames } from "primereact/utils";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [sellerDetails, setSellerDetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/buyer/allProperties")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleSellerDetails = async (product) => {
    await axios
      .get(`http://localhost:8080/api/buyer/viewSellerDetails/${product.id}`)
      .then((res) => {
        setSellerDetails(res.data);
        setVisible(true);
        setProductDetails(product);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleLike = async (product) => {
    await axios
      .post(`http://localhost:8080/api/buyer/like/${product.id}`)
      .then((res) => {
        console.log(res.data);
        setLikeClicked(true);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const itemTemplate = (product, index) => {
    return (
     
        <div className="col-12 " key={product.id}>
          <div
            className={classNames(
              "flex flex-column xl:flex-row  p-4 gap-4 "
            )}
          >
            <img
              className="w-12 h-10 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round bg-contain"
              src={`${`data:image/jpeg;base64,${product.image}`}`}
              alt={product.name}
            />
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center  flex-1 gap-4">
              <div className="flex flex-column align-items-center  sm:align-items-start gap-3">
                <div className="text-2xl font-bold text-900">
                  {product.name}
                </div>
                <div className="flex   gap-5">
                  <div className="flex flex-column gap-3">
                    <span className="flex align-items-center gap-2">
                      <i className="pi pi-map-marker"></i>
                      <span className="font-semibold">{product.address}</span>
                    </span>
                    <span className="flex align-items-center gap-2">
                      <i className="pi pi-warehouse"></i>
                      <span className="font-semibold">
                        Apratment Type: {product.bedrooms}BHK
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-column gap-3">
                    <span className="flex align-items-center gap-2">
                      <i className="pi pi-calendar"></i>
                      <span className="font-semibold">
                        Available from : {product.available}
                      </span>
                    </span>
                    <span
                      className="flex align-items-center gap-2 cursor-pointer"
                      onClick={() => handleLike(product)}
                    >
                      <i
                        className={
                          !likeClicked
                            ? "pi pi-thumbs-up"
                            : "pi pi-thumbs-up-fill"
                        }
                        
                      ></i>
                      <span className="font-semibold">{product.likes}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <span className="text-2xl font-semibold">
                  {formatCurrency(product.rate)}
                </span>
                <div>
                  <Button
                    icon="pi pi-external-link"
                    label="I'm Intrested"
                    onClick={() => handleSellerDetails(product)}
                  ></Button>
                  <Dialog
                    visible={visible}
                    style={{ width: "50vw" }}
                    draggable={false}
                    header={
                      <div>
                        <p>Contact Seller</p>
                        <Tag value="Truested Seller" severity="success" />
                      </div>
                    }
                    footer={
                      <div>
                        <Button
                          label="close"
                          onClick={() => setVisible(false)}
                        ></Button>
                      </div>
                    }
                    onHide={() => {
                      if (!visible) return;
                      setVisible(false);
                    }}
                  >
                    <div className="flex flex-row gap-3">
                      <span className="m-0 flex-1">
                        {productDetails && (
                          <>
                            <h2>Property Details:</h2>
                            <p> Property Name : {productDetails.name}</p>
                            <p>Location: {productDetails.address}</p>
                            <p>Apartment Type : {productDetails.bedrooms}BHK</p>
                            <p>Available From : {productDetails.available}</p>
                          </>
                        )}
                      </span>

                      <span className="m-0 flex-1">
                        <h2>Seller Details:</h2>
                        <p>First Name : {sellerDetails.firstname}</p>
                        <p>Last Name: {sellerDetails.lastname}</p>
                        <p>Phone: {sellerDetails.mobile}</p>
                        <p>Email: {sellerDetails.email}</p>
                      </span>
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter my-8 mx-8">{list}</div>;
  };
  return (
    <div className="card">
      <DataView
        value={products}
        listTemplate={listTemplate}
        paginator
        rows={5}
      />
    </div>
  );
};

export default Dashboard;
