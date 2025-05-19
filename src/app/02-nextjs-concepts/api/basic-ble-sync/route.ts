import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "BLE Sync API is active", 
    status: "ok",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data for BLE sync:", data);

    // Here you would typically process the BLE data
    // For this example, we'll just echo it back
    return NextResponse.json({ 
      message: "Data received successfully",
      receivedData: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error processing BLE sync data:", error);
    return NextResponse.json(
      { 
        error: "Failed to process BLE sync data",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
}
