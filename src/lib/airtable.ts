import { Product } from "@/components/ProductCard";
import { normalizeSlug } from "@/lib/slugs";

// --- PRODUCTS ---

type AirtableAttachment = {
  url: string;
};

type AirtableProductFields = {
  Name?: string;
  Slug?: string;
  Description?: string;
  Price?: number | string;
  Image?: AirtableAttachment[];
  Category?: string;
  Availability?: boolean | string;
  Featured?: boolean;
  Badge?: string;
};

type AirtableRecord<TFields> = {
  id: string;
  createdTime?: string;
  fields: TFields;
};

type AirtableOrderFields = {
  "Customer Name": string;
  "WhatsApp Number": string;
  "Products": string[];
  "Total": number;
  "Status": string;
  "Notes"?: string;
};

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
    return data.records.map((record: AirtableRecord<AirtableProductFields>) => {
      const f = record.fields;
      // Handle Airtable Image attached array
      const imageUrl = f.Image && f.Image.length > 0 ? f.Image[0].url : "/orange_juice.png";
      const name = f.Name || "Producto";
      const sourceSlug = f.Slug || name;
      const slug = normalizeSlug(sourceSlug);

      if (process.env.NODE_ENV === "development") {
        console.debug("[products] Airtable product slug mapping", {
          id: record.id,
          name,
          airtableSlug: f.Slug || "",
          normalizedSlug: slug,
          href: `/producto/${slug}`,
        });
      }
      
      return {
        id: record.id, // Using Airtable record ID
        slug: slug || record.id,
        name,
        description: f.Description || "",
        price: typeof f.Price === 'number' ? f.Price : parseFloat(f.Price || "") || 0,
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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const normalizedSlug = normalizeSlug(decodeURIComponent(slug));
  const products = await getProducts();
  const product = products.find((p) => normalizeSlug(p.slug) === normalizedSlug) || null;

  if (process.env.NODE_ENV === "development") {
    console.debug("[products] getProductBySlug", {
      receivedSlug: slug,
      normalizedSlug,
      found: !!product,
      productId: product?.id,
      productName: product?.name,
    });
  }

  return product;
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

type AirtableReviewFields = {
  "Customer Name"?: string;
  Rating?: number;
  Comment?: string;
  Approved?: boolean;
  "Created At"?: string;
};

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
    return data.records.map((record: AirtableRecord<AirtableReviewFields>) => {
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
  
  const fields: AirtableOrderFields = {
    "Customer Name": order.customerName,
    "WhatsApp Number": order.whatsapp,
    "Products": order.productIds,
    "Total": order.total,
    "Status": "Pending"
  };

  if (order.notes && order.notes.trim() !== "") {
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
