import React, { useState } from "react";
import { Button } from "flowbite-react";
import MainHeading from "./components/MainHeading";
import SubHeading from "./components/SubHeading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CheckOutForm from "./components/CheckOutForm";
import Container from "./components/Container";
import CheckOutItemList from "./components/CheckOutItemList";
import ProductsDrawer from "./components/ProductsDrawer";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "apple", price: 1500, stock: 50 },
    { id: 2, name: "orange", price: 500, stock: 40 },
    { id: 3, name: "banana", price: 1500, stock: 30 },
    { id: 4, name: "mango", price: 1500, stock: 20 },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(!isOpen);

  const [items, setItems] = useState([]);

  const updateAmount = () => {
    setItems((currentItems) => {
      return currentItems.map((currentItem) => {
        return {
          ...currentItem,
          amount: currentItem.price * currentItem.qty,
        };
      });
    });
  };

  const updateStock = () => {
    setProducts((currentProducts) => {
      return currentProducts.map((currentProduct) => {
        const isItem = items.filter((item) => item.id === currentProduct.id);
        if (isStore.length !== 0) {
          setItems([]);
          return {
            ...currentProduct,
            stock: currentProduct.stock - isItem[0].qty,
          };
        }

        return currentProduct;
      });
    });

    toast.success("invoice saved", { duration: 2000, position: "top-right" });
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div>
        <Toaster />
      </div>
      <Header>
        <Container>
          <MainHeading>Invoice App</MainHeading>
          <SubHeading>MMS Solution</SubHeading>
        </Container>
      </Header>
      <CheckOutForm
        products={products}
        setItems={setItems}
        items={items}
        updateAmount={updateAmount}
      />
      <CheckOutItemList
        items={items}
        setItems={setItems}
        updateAmount={updateAmount}
      />
      <ProductsDrawer
        products={products}
        setProducts={setProducts}
        handleClose={handleClose}
        isOpen={isOpen}
      />
      <Footer>
        <Container>
          <div className="flex gap-3 justify-end items-center">
            <Button
              className="border border-orange-500/100 focus:scale"
              color={""}
              onClick={handleClose}
            >
              Manage Product
            </Button>
            <Button
              onClick={updateStock}
              color={""}
              className="bg-orange-500/100 hover:bg-orange-600"
            >
              Print
            </Button>
          </div>
        </Container>
      </Footer>
    </main>
  );
};

export default App;
