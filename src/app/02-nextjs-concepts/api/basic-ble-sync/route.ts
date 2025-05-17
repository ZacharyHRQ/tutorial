export async function GET() {
  return Response.json({ message: "BLE Sync API is active", status: "ok" });
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received data for BLE sync:", data);
  return Response.json({ message: "Data received", receivedData: data });
}
