import { useState } from "react";

function Home() {
  const [cart, setCart] = useState([
    {
      product: "price_1NmtgnLnIY6rREyZHyhv2T2D",
      quantity: 2,
    },
    {
      product: "price_1NmtffLnIY6rREyZQWazNRCy",
      quantity: 1,
    },
    {
      product: "price_1NmteSLnIY6rREyZaK1EsgQw",
      quantity: 1,
    },
  ]);
  

  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      }
    );

    if (!response.ok) {
      return;
    }

    const { url } = await response.json();
    window.location = url;
  }

  return (
    <div>
      <button onClick={handlePayment}>Checkout</button>
    </div>
  );
}

export default Home;
