import React from 'react';
import { X } from 'lucide-react';

const ProductCatalog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 p-4 flex justify-between items-center" style={{borderColor: '#d4a574'}}>
          <h2 className="text-2xl font-bold" style={{color: '#8b4513'}}>Catálogo de Produtos</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
            style={{color: '#8b4513'}}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p>Este é o novo Catálogo de Produtos. Se você está vendo isso, o componente está sendo renderizado corretamente.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;


