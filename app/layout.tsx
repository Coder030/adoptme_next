'use client'

import { QueryClient, QueryClientProvider } from "react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  const adoptedPet = useState(null);
  return (
    <html lang="en">
     <QueryClientProvider client={queryClient}>
       <AdoptedPetContext.Provider value={adoptedPet}>
           <body>
           <div id="modal"></div>
            {children}
          </body>
       </AdoptedPetContext.Provider>
     </QueryClientProvider>
    </html>
  )
}
