// contexts/SelectedItemsContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedItem {
  id: string
  name: string
  description: string | null
  price: string | null
  price_cost: string | null
  type: string
}

interface SelectedItemsContextType {
  selectedItems: SelectedItem[];
  addItem: (item: SelectedItem) => void;
}

const SelectedItemsContext = createContext<SelectedItemsContextType | undefined>(undefined);

export function SelectedItemsProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

//VERIFICA SE O ITEM JÁ ESTA NA LISTA, IMPEDINDO DUPLICATAS
//   const addItem = (item: SelectedItem) => {
//     setSelectedItems((prevItems) => {
//       if (!prevItems.some((existingItem) => existingItem.id === item.id)) {
//         return [...prevItems, item];
//       }
//       return prevItems;
//     });
//   };

    const addItem = (item: SelectedItem) => {
        setSelectedItems((prevItems) => [...prevItems, item]);
    };

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, addItem }}>
      {children}
    </SelectedItemsContext.Provider>
  );
}

export function useSelectedItems() {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error("useSelectedItems must be used within a SelectedItemsProvider");
  }
  return context;
}
