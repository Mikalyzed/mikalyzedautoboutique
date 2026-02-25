export const dynamic = "force-dynamic";

export async function GET() {
  const csv = `store_code,store_name,store_address
11647946455691092060,Mikalyzed Auto Boutique,"3455 NW 30th Ave, Miami, FL 33142, US"`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
