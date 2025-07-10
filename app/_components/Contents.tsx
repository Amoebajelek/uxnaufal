import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Portofolios from "./Portofolios";
import Contacts from "./Contacts";
import Footer from "./Footer";

export default function Contents() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Header />
      <Portofolios />
      <Contacts />
      <Footer />
    </div>
  );
}
