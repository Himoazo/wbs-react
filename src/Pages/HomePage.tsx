import { useProductContext } from "../Context/ProductContext"
import { Link } from "react-router-dom";

const HomePage = () => {
  const { products } = useProductContext();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Lagerhanteringssystem</h1>
      <p className="text-center m-3 font-bold">Listan nedan visar samtliga produkter som finns på lagret för tillfället</p>
      <div className="overflow-x-auto">
        {products.length > 0 ? 
        <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">Produktnamn</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Pris</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
              <Link to={`/product/${p.id}`} className="text-blue-600 hover:underline">
                {p.productName}
              </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{p.price} kr</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{p.quantity} st</td>
            </tr>
          ))}
        </tbody>
      </table>
        : <div className="border border-red-800 text-2xl font-bold mb-4 text-center"> Det finns inga produkter att visa</div>}
        
      </div>
    </div>
  );
  
  
}

export default HomePage
