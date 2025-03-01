// import { useEffect, useState } from "react";
// import { db } from "./firebase";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// export const useFirestore = () => {
//   const [items, setItems] = useState([]); // ضمان أن القيمة الافتراضية مصفوفة
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const q = query(collection(db, "users","items"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const fetched = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         console.log(fetched); //console.log(fetched) to see the data
//         setItems(fetched);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching data:", error);
//         setItems([]);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   return { items }; // إرجاع كائن بدلًا من المصفوفة فقط
// };
