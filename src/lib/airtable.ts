import { Product } from "@/components/ProductCard";

// --- PRODUCTS ---

export async function getProducts(): Promise<Product[]> {
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TOKEN = process.env.AIRTABLE_TOKEN;
  const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
  
  const table = process.env.AIRTABLE_PRODUCTS_TABLE || "Products";
  const url = `https://api.airtable.com/v0/${BASE_ID}/${table}`;
  
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Airtable Error: ${res.statusText}`);
    
    const data = await res.json();
    return data.records.map((record: any) => {
      const f = record.fields;
      // Handle Airtable Image attached array
      const imageUrl = f.Image && f.Image.length > 0 ? f.Image[0].url : "/orange_juice.png";
      
      return {
        id: record.id, // Using Airtable record ID
        slug: f.Slug || record.id,
        name: f.Name,
        description: f.Description || "",
        price: typeof f.Price === 'number' ? f.Price : parseFloat(f.Price) || 0,
        image: imageUrl,
        category: f.Category || "Otros",
        featured: !!f.Featured,
        available: f.Availability !== false && f.Availability !== "Out of Stock",
        badge: f.Badge || (!!f.Featured ? "DESTACADO" : undefined),
      };
    });
  } catch (error) {
    console.error("Error fetching products from Airtable:", error);
    return [];
  }
}

// --- REVIEWS ---

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export async function getApprovedReviews(): Promise<Review[]> {
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TOKEN = process.env.AIRTABLE_TOKEN;
  const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
  
  const table = process.env.AIRTABLE_REVIEWS_TABLE || "Reviews";
  // Filter by Approved = true
  const filterByFormula = encodeURIComponent("{Approved}=TRUE()");
  const url = `https://api.airtable.com/v0/${BASE_ID}/${table}?filterByFormula=${filterByFormula}&sort[0][field]=Created At&sort[0][direction]=desc`;
  
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Airtable Error: ${res.statusText}`);
    
    const data = await res.json();
    return data.records.map((record: any) => {
      const f = record.fields;
      return {
        id: record.id,
        customerName: f["Customer Name"] || "Cliente Anónimo",
        rating: f.Rating || 5,
        comment: f.Comment || "",
        approved: !!f.Approved,
        createdAt: f["Created At"] || record.createdTime,
      };
    });
  } catch (error) {
    console.error("Error fetching reviews from Airtable:", error);
    return [];
  }
}

// --- ORDERS ---

export interface OrderPayload {
  customerName: string;
  whatsapp: string;
  notes: string;
  total: number;
  productIds: string[]; // Airtable record IDs
  orderSummary: string; // Text summary of quantities
}

export async function createOrder(order: OrderPayload) {
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TOKEN = process.env.AIRTABLE_TOKEN;
  const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
  
  const table = process.env.AIRTABLE_ORDERS_TABLE || "Orders";
  const url = `https://api.airtable.com/v0/${BASE_ID}/${table}`;
  
  const fields = {
    "Customer Name": order.customerName,
    "WhatsApp Number": order.whatsapp,
    "Products": order.productIds,
    "Total": order.total,
    "Status": "Pending"
  };

  if (order.notes && order.notes.trim() !== "") {
    // @ts-ignore
    fields["Notes"] = order.notes;
  }

  const payload = {
    records: [{ fields }]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMsg = errorBody.error?.message || errorBody.error?.type || "Failed to create order";
    console.error("Error creating order:", res.statusText, errorBody);
    throw new Error(`Airtable Error: ${errorMsg}`);
  }

  return await res.json();
}
