import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would connect to your database here
    // For now, I'll show you the structure you need
    
    // Example with a database query (replace with your actual database connection)
    /*
    const recentReports = await db.query(`
      SELECT 
        vin,
        vehicle_brand as brand,
        vehicle_model as model,
        report_type,
        created_at as date
      FROM reports 
      WHERE status = 'completed'
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    */
    
    // For demonstration, returning structured data
    // Replace this with your actual database query
    const recentReports = [
      {
        vin: "1HGBH41JXMN109186",
        brand: "Honda",
        model: "Civic",
        date: new Date().toISOString(),
        reportType: "carfax"
      },
      {
        vin: "JH4TB2H26CC000000", 
        brand: "Acura",
        model: "TLX",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        reportType: "autocheck"
      },
      {
        vin: "2T1BURHE5JC014415",
        brand: "Toyota", 
        model: "Corolla",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        reportType: "carfax"
      },
      {
        vin: "KMHLN4AJ8EU014618",
        brand: "Hyundai",
        model: "Elantra", 
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        reportType: "autocheck"
      },
      {
        vin: "1N4AL3AP9DC000000",
        brand: "Nissan",
        model: "Altima",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
        reportType: "carfax"
      }
    ];

    return NextResponse.json({
      success: true,
      data: recentReports
    });

  } catch (error) {
    console.error('Error fetching recent reports:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch recent reports' 
      },
      { status: 500 }
    );
  }
}