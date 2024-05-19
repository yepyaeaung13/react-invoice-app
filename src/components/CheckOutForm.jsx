import React, { useRef, useState } from "react";
import Container from "./Container";
import { Button, Label, Select, TextInput } from "flowbite-react";

const CheckOutForm = ({ products, setItems, items, updateAmount }) => {
  const inputQty = useRef(0);
  const selectProduct = useRef("Select Product");

  const handleForm = (e) => {
    e.preventDefault();
    const selectProductValue = selectProduct.current.value;
    const inputQtyValue = inputQty.current.value;
    const currentProduct = products.filter((product) => {
      if (product.id === parseInt(selectProductValue)) {
        return product;
      }
    });

    const isItems = items.filter((item) => item.id === currentProduct[0].id);

    if (isItems.length === 0) {
      const item = {
        id: currentProduct[0].id,
        name: currentProduct[0].name,
        price: currentProduct[0].price,
        qty: parseInt(inputQtyValue),
      };
      setItems((current) => {
        return [...current, item];
      });
    } else {
      setItems((currentItems) => {
        return currentItems.map((currentItem) => {
          if (currentItem.id === parseInt(selectProductValue)) {
            return {
              ...currentItem,
              qty: currentItem.qty + parseInt(inputQtyValue),
            };
          }
          return currentItem;
        });
      });
    }
    inputQty.current.value = "";
    updateAmount();
  };

  return (
    <>
      <Container>
        <form
          onSubmit={handleForm}
          className="grid grid-cols-5 grid-rows-1 gap-1 mt-5 mb-5"
          id="checkOutForm"
        >
          <Select
            ref={selectProduct}
            id="products"
            className="col-span-2"
            required
          >
            {products.map(({ id, name }) => {
              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </Select>
          <TextInput
            ref={inputQty}
            id="password"
            type="number"
            className="col-span-2"
            placeholder="Enter Qty"
            required
          />
          <Button
            type="submit"
            color={""}
            className="bg-orange-500/100 col-span-1"
          >
            Buy
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CheckOutForm;
