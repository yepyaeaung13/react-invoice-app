import React, { useRef } from "react";
import { Button, Drawer, Label, Table, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

const ProductsDrawer = ({ handleClose, isOpen, products, setProducts }) => {
  const productName = useRef();
  const productPrice = useRef();
  const productQty = useRef();

  const handleNewProduct = (e) => {
    e.preventDefault();
    const name = productName.current.value;
    const price = parseFloat(productPrice.current.value);
    const stock = parseInt(productQty.current.value);
    setProducts((current) => {
      return [
        ...current,
        {
          id: Date.now(),
          name,
          price,
          stock,
        },
      ];
    });

    toast.success("Create success", { duration: 2000, position: "top-center" });
    productName.current.value = "";
    productPrice.current.value = "";
    productQty.current.value = "";
  };
  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      className="duration-300 max-h-100vh overflow-visible flex flex-col w-96"
    >
      <Drawer.Header title="Products Inventory" className="uppercase" />
      <Drawer.Items className="overflow-y-scroll border border-orange-200 scroll-smooth">
        <Table className="products-inventory">
          <Table.Head>
            <Table.HeadCell className="text-[10px] text-left">
              No
            </Table.HeadCell>
            <Table.HeadCell className="text-[10px] ">Product</Table.HeadCell>
            <Table.HeadCell className="text-[10px] text-right">
              QTY
            </Table.HeadCell>
            <Table.HeadCell className="text-[10px] text-right">
              Price
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="overflow-y-auto">
            {products.map(({ id, name, stock, price }) => (
              <Table.Row key={id} className={`${stock <= 0 && "text-red-600"}`}>
                <Table.Cell className="product-items"></Table.Cell>
                <Table.Cell className="text-left">{name}</Table.Cell>
                <Table.Cell className="text-right">{stock}</Table.Cell>
                <Table.Cell className="text-right">${price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Drawer.Items>
      <form onSubmit={handleNewProduct} className="flex flex-col gap-3 mt-auto">
        <Label className="uppercase pt-3">Create New Product</Label>
        <TextInput
          id="productsName"
          type="text"
          className="col-span-2"
          placeholder="Enter Products Name"
          required
          ref={productName}
        />
        <div className="flex gap-2">
          <TextInput
            id="productPrice"
            type="number"
            className="col-span-2"
            placeholder="Enter Price"
            required
            ref={productPrice}
          />
          <TextInput
            id="productQty"
            type="number"
            className="col-span-2"
            placeholder="Enter Qty"
            required
            ref={productQty}
          />
        </div>
        <Button
          type="submit"
          color={""}
          className="bg-orange-500/100 col-span-1"
        >
          Save
        </Button>
      </form>
    </Drawer>
  );
};

export default ProductsDrawer;
