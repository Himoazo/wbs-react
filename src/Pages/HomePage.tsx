import { useProductContext } from "../Context/ProductContext"

const HomePage = () => {
  const { products } = useProductContext();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Lagerhanteringssystem</h1>
      <p className="text-center m-3 font-bold">Listan nedan visar samtliga produkter som finns på lagret för tillfället</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Produktnamn</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Pris</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{p.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{p.price} kr</td>
                <td className="border border-gray-300 px-4 py-2">{p.quantity} st</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
}

export default HomePage
