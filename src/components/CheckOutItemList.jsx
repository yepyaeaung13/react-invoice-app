import React, { useRef } from "react";
import Container from "./Container";
import { Button, Table } from "flowbite-react";
import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniMinus } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";

const CheckOutItemList = ({ items, setItems, updateAmount }) => {
  const addSubQty = (id, num) => {
    setItems((currentItems) => {
      return currentItems.map((currentItem) => {
        if (currentItem.id === id) {
          if (currentItem.qty > 0 || num !== -1) {
            return {
              ...currentItem,
              qty: currentItem.qty + num,
            };
          }
        }
        return currentItem;
      });
    });

    updateAmount();
  };
  const deleteItems = (id) => {
    setItems((currentItems) => {
      return currentItems.filter((currentItem) => currentItem.id !== id);
    });
    toast.success("delete success.", { duration: 2000, position: "top-right" });
    updateAmount();
  };
  return (
    <Container>
      <div className="overflow-x-auto border border-orange-200/70 rounded-sm">
        <Table className="invoice-table">
          <Table.Head>
            <Table.HeadCell className="text-right">No</Table.HeadCell>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell className="text-center">QTY</Table.HeadCell>
            <Table.HeadCell className="text-center">Price</Table.HeadCell>
            <Table.HeadCell className="text-center">Amount</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="border-y hidden last:table-row">
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell className="-translate-x-[40%]">
                There is no item
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            {items.map(({ id, name, qty, price, amount }) => (
              <Table.Row
                key={id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="product-id text-right"></Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {name}
                </Table.Cell>
                <Table.Cell className="text-right flex items-center px-0">
                  <Button
                    onClick={() => {
                      addSubQty(id, -1);
                    }}
                    color={""}
                    size={"xs"}
                    className="border border-orange-500 text-black active:scale-90"
                  >
                    {/* <HiMiniMinus /> */}-
                  </Button>
                  <span className="w-8 pe-1">{qty}</span>
                  <Button
                    onClick={() => {
                      addSubQty(id, 1);
                    }}
                    color={""}
                    size={"xs"}
                    className="border border-orange-500 text-black  active:scale-90"
                  >
                    {/* <HiMiniPlus /> */}+
                  </Button>
                </Table.Cell>
                <Table.Cell className="text-right w-24">${price}</Table.Cell>
                <Table.Cell className="text-right">${amount}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      deleteItems(id);
                    }}
                    className="font-medium text-orange-500 hover:underline"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Body>
            <Table.Row className="border-y bg-gray-100">
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell className="font-bold text-right p-0">
                Total Amount
              </Table.Cell>
              <Table.Cell className="font-bold text-right">
                ${items.reduce((pv, cv) => pv + cv.amount, 0)}
              </Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </Container>
  );
};

export default CheckOutItemList;
